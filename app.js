(function () {
  "use strict";

  const exam = window.EXAM;
  const root = document.getElementById("exam");
  const graders = []; // { el, check(): boolean, show(): void, lock(): void }

  /* ---------- 작은 도우미 ---------- */
  const h = (tag, attrs = {}, ...kids) => {
    const el = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs)) {
      if (k === "class") el.className = v;
      else if (k === "html") el.innerHTML = v;
      else if (k.startsWith("on")) el.addEventListener(k.slice(2), v);
      else el.setAttribute(k, v);
    }
    kids.flat().forEach((c) => c != null && el.append(c.nodeType ? c : document.createTextNode(c)));
    return el;
  };
  const circled = (n) => "①②③④⑤⑥⑦⑧⑨⑩"[n] || `(${n + 1})`;
  const norm = (s) =>
    (s || "")
      .normalize("NFC")
      .trim()
      .replace(/^(네|예|아니요|아니오)\s*[,，]?\s*/, "")
      .replace(/[\s.,!?~。，·]/g, "");

  /* ---------- 국기 (SVG) ---------- */
  function star(cx, cy, r, rot = -90) {
    const pts = [];
    for (let i = 0; i < 10; i++) {
      const rad = ((rot + i * 36) * Math.PI) / 180;
      const rr = i % 2 ? r * 0.382 : r;
      pts.push((cx + rr * Math.cos(rad)).toFixed(2) + "," + (cy + rr * Math.sin(rad)).toFixed(2));
    }
    return `<polygon points="${pts.join(" ")}" fill="#ffde00"/>`;
  }
  function trigram(x, y, angle, pattern) {
    // pattern: 3 rows, true = 끊긴 막대
    let s = `<g transform="translate(${x} ${y}) rotate(${angle})">`;
    pattern.forEach((broken, i) => {
      const yy = -5 + i * 5;
      if (broken) s += `<rect x="-6" y="${yy - 1.5}" width="5.2" height="3" /><rect x="0.8" y="${yy - 1.5}" width="5.2" height="3" />`;
      else s += `<rect x="-6" y="${yy - 1.5}" width="12" height="3" />`;
    });
    return s + "</g>";
  }
  const FLAGS = {
    kr: () =>
      `<svg viewBox="0 0 90 60"><rect width="90" height="60" fill="#fff"/>
       <g transform="rotate(33.7 45 30)">
        <circle cx="45" cy="30" r="15" fill="#0047a0"/>
        <path d="M30 30a15 15 0 0 1 30 0a7.5 7.5 0 0 1-15 0a7.5 7.5 0 0 0-15 0z" fill="#cd2e3a"/>
       </g>
       <g fill="#000">
        ${trigram(18, 12, -56.3, [false, false, false])}
        ${trigram(72, 48, -56.3, [true, true, true])}
        ${trigram(72, 12, 56.3, [true, false, true])}
        ${trigram(18, 48, 56.3, [false, true, false])}
       </g></svg>`,
    vn: () => `<svg viewBox="0 0 90 60"><rect width="90" height="60" fill="#da251d"/>${star(45, 31, 17)}</svg>`,
    cn: () =>
      `<svg viewBox="0 0 90 60"><rect width="90" height="60" fill="#de2910"/>${star(15, 15, 9)}${star(30, 6, 3, -40)}${star(36, 12, 3, -20)}${star(36, 21, 3, 0)}${star(30, 27, 3, 20)}</svg>`,
    tw: () => {
      // 청천백일만지홍기: 빨간 바탕, 왼쪽 위 파란 칸, 흰 해(빛살 12개)
      const cx = 22.5, cy = 15, pts = [];
      for (let i = 0; i < 24; i++) {
        const a = ((i * 15 - 90) * Math.PI) / 180;
        const r = i % 2 ? 6.6 : 11.25;
        pts.push((cx + r * Math.cos(a)).toFixed(2) + "," + (cy + r * Math.sin(a)).toFixed(2));
      }
      return `<svg viewBox="0 0 90 60"><rect width="90" height="60" fill="#fe0000"/>
        <rect width="45" height="30" fill="#000095"/>
        <polygon points="${pts.join(" ")}" fill="#fff"/>
        <circle cx="${cx}" cy="${cy}" r="6.4" fill="#000095"/>
        <circle cx="${cx}" cy="${cy}" r="5.6" fill="#fff"/></svg>`;
    },
    us: () => {
      let s = `<svg viewBox="0 0 90 60"><rect width="90" height="60" fill="#fff"/>`;
      for (let i = 0; i < 13; i += 2) s += `<rect y="${(i * 60) / 13}" width="90" height="${60 / 13}" fill="#b22234"/>`;
      s += `<rect width="38" height="${(7 * 60) / 13}" fill="#3c3b6e"/>`;
      for (let r = 0; r < 5; r++) for (let c = 0; c < 6; c++) s += `<circle cx="${4 + c * 6}" cy="${4 + r * 6.2}" r="1.1" fill="#fff"/>`;
      return s + "</svg>";
    }
  };
  function pic(p, cls = "pic") {
    if (!p) return null;
    if (p.startsWith("flag:")) return h("div", { class: cls + " flag", html: FLAGS[p.slice(5)]() });
    return h("div", { class: cls, "aria-hidden": "true" }, p);
  }

  /* ---------- 결과 표시 ---------- */
  function mark(el, ok, answerText) {
    el.classList.add(ok ? "is-right" : "is-wrong");
    if (!ok && answerText) el.append(h("span", { class: "answer-key" }, "정답: " + answerText));
  }

  /* ---------- 유형별 렌더러 ---------- */
  const R = {};

  R.match = (g, wrap) => {
    const list = h("div", { class: "match-grid" });
    g.items.forEach((it, i) => {
      const sel = h("select", { "aria-label": `(${i + 1}) 알맞은 말` },
        h("option", { value: "" }, "— 고르세요 —"),
        g.options.map((o) => h("option", { value: o }, o)));
      const cell = h("div", { class: "match-item" }, h("span", { class: "num" }, `(${i + 1})`), pic(it.pic), sel);
      list.append(cell);
      graders.push({
        check: () => sel.value === it.answer,
        show(ok) { mark(cell, ok, it.answer); },
        lock() { sel.disabled = true; }
      });
    });
    wrap.append(list);
  };

  // 그림을 보고 단어 고르기 (버튼)
  R.picword = (g, wrap) => {
    const list = h("div", { class: "pw-list" });
    g.items.forEach((it, i) => {
      const name = `pw-${graders.length}`;
      const btns = h("div", { class: "pw-opts" },
        g.options.map((o) => h("label", { class: "pill" }, h("input", { type: "radio", name, value: o }), h("span", {}, o))));
      const row = h("div", { class: "pw-item" }, h("span", { class: "num" }, `(${i + 1})`), pic(it.pic, "pic big"), btns);
      list.append(row);
      graders.push({
        check: () => (row.querySelector("input:checked") || {}).value === it.answer,
        show(ok) { mark(row, ok, it.answer); },
        lock() { row.querySelectorAll("input").forEach((x) => (x.disabled = true)); }
      });
    });
    wrap.append(list);
  };

  // 단어를 보고 그림 고르기
  R.wordpic = (g, wrap) => {
    const list = h("div", { class: "wp-list" });
    g.items.forEach((it, i) => {
      const name = `wp-${graders.length}`;
      const opts = h("div", { class: "wp-opts" });
      g.options.forEach((o, k) =>
        opts.append(h("label", { class: "choice wp-card" },
          h("input", { type: "radio", name, value: String(k) }),
          h("span", { class: "mark" }, circled(k)),
          h("span", { class: "pic-opt", "aria-label": `${k + 1}번 그림` }, o))));
      const row = h("div", { class: "wp-item" },
        h("div", { class: "wp-word" }, h("span", { class: "num" }, `(${i + 1})`), h("b", {}, it.word)),
        opts);
      list.append(row);
      graders.push({
        check: () => (row.querySelector("input:checked") || {}).value === String(it.answer),
        show(ok) {
          mark(row, ok, ok ? null : circled(it.answer));
          opts.children[it.answer].classList.add("correct-opt");
        },
        lock() { row.querySelectorAll("input").forEach((x) => (x.disabled = true)); }
      });
    });
    wrap.append(list);
  };

  R.fill = (g, wrap) => {
    const list = h("div", { class: "fill-list" + (g.short ? " short" : "") });
    g.items.forEach((it, i) => {
      const input = h("input", {
        type: "text", autocomplete: "off", autocapitalize: "off", spellcheck: "false",
        class: g.short ? "blank blank-short" : "blank",
        "aria-label": `(${i + 1}) 빈칸`
      });
      const num = g.card || g.circled ? circled(i) : `(${i + 1})`;
      const line = h("div", { class: "fill-line" },
        it.before ? h("span", {}, it.before + " ") : null,
        input,
        it.after ? h("span", {}, (g.tight ? "" : " ") + it.after) : g.short ? null : h("span", {}, "."),
        it.hint ? h("span", { class: "hint" }, ` (${it.hint})`) : null);
      const row = h("div", { class: "fill-item" + (it.pic ? " with-pic" : "") },
        h("span", { class: "num" }, num),
        it.pic ? pic(it.pic) : null,
        h("div", { class: "fill-body" }, it.q ? h("div", { class: "q" }, it.q) : null, line));
      list.append(row);
      graders.push({
        check: () => it.answers.some((a) => norm(a) === norm(input.value)),
        show(ok) { mark(row, ok, it.answers[0]); },
        lock() { input.readOnly = true; }
      });
    });
    wrap.append(list);
  };

  R.pick = (g, wrap) => {
    const list = h("div", { class: "pick-list" });
    g.items.forEach((it, i) => {
      const name = `pick-${graders.length}`;
      const btns = g.choices.map((c) =>
        h("label", { class: "pill" }, h("input", { type: "radio", name, value: c }), h("span", {}, c)));
      const row = h("div", { class: "pick-item" },
        h("span", { class: "num" }, `(${i + 1})`),
        h("span", { class: "word" }, it.word),
        h("span", { class: "paren" }, "(", ...btns.flatMap((b, k) => (k ? ["/", b] : [b])), ")"),
        it.tail ? h("span", {}, " " + it.tail) : h("span", {}, "."));
      list.append(row);
      graders.push({
        check: () => (row.querySelector("input:checked") || {}).value === it.answer,
        show(ok) { mark(row, ok, it.answer); },
        lock() { row.querySelectorAll("input").forEach((x) => (x.disabled = true)); }
      });
    });
    wrap.append(list);
  };

  R.ox = (g, wrap) => {
    const list = h("div", { class: "ox-list" });
    g.items.forEach((it, i) => {
      const name = `ox-${graders.length}`;
      const row = h("div", { class: "ox-item" },
        h("span", { class: "num" }, `(${i + 1})`),
        h("span", { class: "q" }, it.q),
        h("span", { class: "ox-btns" },
          ["O", "X"].map((v) => h("label", { class: "pill ox" }, h("input", { type: "radio", name, value: v }), h("span", {}, v)))));
      list.append(row);
      graders.push({
        check: () => (row.querySelector("input:checked") || {}).value === it.answer,
        show(ok) { mark(row, ok, it.answer); },
        lock() { row.querySelectorAll("input").forEach((x) => (x.disabled = true)); }
      });
    });
    wrap.append(list);
  };

  R.choice = (g, wrap) => {
    g.items.forEach((it) => {
      const name = `ch-${graders.length}`;
      const opts = h("div", { class: "choices" + (g.picOptions ? " pic-choices" : it.options.every((o) => o.length <= 6) ? " two-col" : "") });
      it.options.forEach((o, k) => {
        opts.append(h("label", { class: "choice" },
          h("input", { type: "radio", name, value: String(k) }),
          h("span", { class: "mark" }, circled(k)),
          g.picOptions ? h("span", { class: "pic-opt", "aria-label": `${k + 1}번 그림` }, o) : h("span", {}, o)));
      });
      wrap.append(opts);
      graders.push({
        check: () => (opts.querySelector("input:checked") || {}).value === String(it.answer),
        show(ok) {
          mark(opts, ok, ok ? null : circled(it.answer) + (g.picOptions ? "" : " " + it.options[it.answer]));
          opts.children[it.answer].classList.add("correct-opt");
        },
        lock() { opts.querySelectorAll("input").forEach((x) => (x.disabled = true)); }
      });
    });
  };

  R.free = (g, wrap) => {
    g.items.forEach((it) => {
      wrap.append(h("textarea", { class: "free", rows: "5", placeholder: it.placeholder || "" }));
      wrap.append(h("p", { class: "teacher-note" }, "※ 이 문항은 자동 채점하지 않아요. 선생님이 확인해요."));
    });
  };

  R.self = (g, wrap) => {
    const table = h("table", { class: "self-table" });
    g.items.forEach((it, i) => {
      const name = `self-${i}`;
      table.append(h("tr", {},
        h("th", {}, it.area),
        h("td", {}, it.q),
        h("td", { class: "self-scale" },
          it.scale.map((s) => h("label", { class: "pill" }, h("input", { type: "radio", name, value: s }), h("span", {}, s))))));
    });
    wrap.append(table);
    if (g.footnote) wrap.append(h("p", { class: "teacher-note" }, g.footnote));
    if (g.checklist) {
      const t = h("table", { class: "self-table" }, h("tr", {}, h("th", {}, "영역"), h("th", {}, "내용"), h("th", {}, "교사 확인")));
      g.checklist.forEach((c) =>
        t.append(h("tr", {},
          h("th", {}, c.area),
          h("td", { class: "checks" }, c.words.map((w) => h("label", { class: "check" }, h("input", { type: "checkbox" }), " " + w))),
          h("td", { class: "teacher-cell" }, ""))));
      wrap.append(t);
    }
  };

  /* ---------- 화면 만들기 ---------- */
  function render() {
    document.title = exam.title;
    document.getElementById("title").textContent = exam.title;
    document.getElementById("subtitle").textContent = exam.subtitle;

    exam.sections.forEach((sec) => {
      const s = h("section", { class: "section" },
        h("header", { class: "sec-head" },
          h("h2", {}, sec.heading),
          h("span", { class: "page-tag" }, `익힘책 ${sec.page}쪽`)));

      if (sec.passage) {
        s.append(h("p", { class: "note" }, sec.passage.note));
        s.append(h("div", { class: "passage" }, sec.passage.text));
      }

      sec.groups.forEach((g) => {
        const wrap = h("div", { class: "group" });
        if (g.note) wrap.append(h("p", { class: "note", html: g.note }));
        if (g.passage) wrap.append(h("div", { class: "passage" }, g.passage));
        wrap.append(h("h3", { class: "instr", html: g.instruction.replace(/</g, "&lt;").replace(/&lt;(\/?)(u|b)>/g, "<$1$2>") }));
        if (g.example) {
          wrap.append(h("div", { class: "example" },
            h("span", { class: "ex-label" }, "보기"),
            g.example.pic ? pic(g.example.pic) : null,
            h("div", {}, g.example.lines.map((l) => h("div", { html: l })))));
        }
        if (g.card) {
          wrap.append(h("div", { class: "id-card" },
            pic(g.card.pic, "id-photo"),
            h("div", { class: "id-title" }, g.card.title),
            h("div", { class: "id-name" }, g.card.name),
            h("div", { class: "id-org" }, g.card.org)));
        }
        if (g.flow) {
          wrap.append(h("ol", { class: "flow" },
            g.flow.map((f) => h("li", {},
              f.num != null ? h("span", { class: "flow-num" }, circled(f.num)) : null,
              h("span", { class: "flow-pic", "aria-hidden": "true" }, f.pic),
              h("span", { class: "flow-label" }, f.label)))));
        }
        if (g.box) wrap.append(h("div", { class: "box" }, g.box));
        R[g.type](g, wrap);
        s.append(wrap);
      });
      root.append(s);
    });

    document.getElementById("total").textContent = graders.length;
  }

  /* ---------- 채점 ---------- */
  function grade() {
    const name = document.getElementById("student").value.trim();
    let right = 0;
    graders.forEach((g) => {
      const ok = g.check();
      if (ok) right++;
      g.show(ok);
      g.lock();
    });
    const total = graders.length;
    const score = Math.round((right / total) * 100);
    const box = document.getElementById("result");
    box.hidden = false;
    box.innerHTML = `<strong>${name ? name + " 학생 " : ""}점수: ${score}점</strong> <span>(${right} / ${total} 문항 정답)</span>
      <p>틀린 문항은 빨간색으로, 정답은 그 아래에 보여요. 자유 쓰기와 자기 평가는 점수에 들어가지 않아요.</p>`;
    document.body.classList.add("graded");
    document.getElementById("submit").hidden = true;
    document.getElementById("retry").hidden = false;
    box.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function countUnanswered() {
    let n = 0;
    root.querySelectorAll(".match-item select").forEach((s) => !s.value && n++);
    root.querySelectorAll("input.blank").forEach((i) => !i.value.trim() && n++);
    root.querySelectorAll(".pick-item, .ox-item, .choices").forEach((el) => !el.querySelector("input:checked") && n++);
    return n;
  }

  document.getElementById("submit").addEventListener("click", () => {
    const left = countUnanswered();
    if (left && !confirm(`아직 답하지 않은 문항이 ${left}개 있어요. 제출할까요?`)) return;
    grade();
  });
  document.getElementById("retry").addEventListener("click", () => {
    if (confirm("답을 모두 지우고 다시 풀까요?")) location.reload();
  });
  document.getElementById("print").addEventListener("click", () => window.print());

  render();
})();
