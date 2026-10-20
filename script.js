(() => {
  const $ = (s) => document.querySelector(s);

  // Always use Vietnam's calendar date, so Vercel visitors in any timezone
  // still see the correct Vietnamese holiday.
  const now = new Date();
  const vnParts = Object.fromEntries(
    new Intl.DateTimeFormat("en-CA", {
      timeZone: "Asia/Ho_Chi_Minh",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    })
      .formatToParts(now)
      .filter((p) => ["year", "month", "day"].includes(p.type))
      .map((p) => [p.type, Number(p.value)])
  );
  const today = new Date(Date.UTC(vnParts.year, vnParts.month - 1, vnParts.day));

  // Keep the holiday data in this file so deployment never depends on a
  // second JS file being loaded correctly.
  const holidays = [
    {id:"new-year",month:1,day:1,name:"Tết Dương lịch",icon:"🎆",category:"HAPPY NEW YEAR",pretitle:"MỘT KHỞI ĐẦU MỚI",title:"Chúc mừng<br><em>năm mới</em>",theme:"theme-new-year",note:"Khởi đầu mới, điều tốt lành"},
    {id:"valentine",month:2,day:14,name:"Lễ Valentine",icon:"💗",category:"A NOTE FULL OF LOVE",pretitle:"GỬI ĐẾN NGƯỜI THƯƠNG",title:"Happy<br><em>Valentine</em>",theme:"theme-valentine",note:"Trao gửi yêu thương"},
    {id:"women-8-3",month:3,day:8,name:"Quốc tế Phụ nữ 8/3",icon:"🌷",category:"A BLOOMING DAY",pretitle:"TẶNG NHỮNG ĐIỀU NGỌT NGÀO",title:"Chúc mừng<br><em>ngày 8/3</em>",theme:"theme-8-3",note:"Một ngày ngập tràn hoa"},
    {id:"liberation",month:4,day:30,name:"Ngày Giải phóng miền Nam",icon:"🇻🇳",category:"A DAY TO REMEMBER",pretitle:"TỰ HÀO VIỆT NAM",title:"Tự hào<br><em>tháng Tư</em>",theme:"theme-national",note:"Tự hào và biết ơn"},
    {id:"labour",month:5,day:1,name:"Quốc tế Lao động",icon:"🌿",category:"A WELL-DESERVED BREAK",pretitle:"GỬI NGƯỜI CHĂM CHỈ",title:"Chúc mừng<br><em>ngày 1/5</em>",theme:"theme-labour",note:"Nghỉ ngơi và nạp năng lượng"},
    {id:"children",month:6,day:1,name:"Quốc tế Thiếu nhi",icon:"🎈",category:"A LITTLE BIT OF MAGIC",pretitle:"GỬI CÁC BẠN NHỎ",title:"Chúc mừng<br><em>ngày 1/6</em>",theme:"theme-child",note:"Niềm vui tuổi thơ"},
    {id:"national",month:9,day:2,name:"Quốc khánh Việt Nam",icon:"🇻🇳",category:"PROUD TO BE VIETNAMESE",pretitle:"CHÚC MỪNG QUỐC KHÁNH",title:"Tự hào<br><em>Việt Nam</em>",theme:"theme-national",note:"Ngày lễ của non sông"},
    {id:"women-20-10",month:10,day:20,name:"Phụ nữ Việt Nam 20/10",icon:"🌹",category:"A LITTLE NOTE FOR YOU",pretitle:"KÍNH CHÚC CHỊ EM PHỤ NỮ",title:"Chúc mừng<br><em>ngày 20/10</em>",theme:"theme-20-10",note:"Hoa tươi và lời chúc ngọt ngào"},
    {id:"teachers",month:11,day:20,name:"Nhà giáo Việt Nam 20/11",icon:"🌻",category:"WITH GRATITUDE",pretitle:"KÍNH GỬI THẦY CÔ",title:"Tri ân<br><em>ngày 20/11</em>",theme:"theme-teacher",note:"Lời tri ân chân thành"},
    {id:"christmas-eve",month:12,day:24,name:"Đêm Giáng sinh",icon:"🕯️",category:"A LITTLE CHRISTMAS MAGIC",pretitle:"MERRY CHRISTMAS",title:"Đêm an lành<br><em>ấm áp yêu thương</em>",theme:"theme-christmas",note:"Ánh đèn và sự ấm áp"},
    {id:"christmas",month:12,day:25,name:"Lễ Giáng sinh",icon:"🎄",category:"MERRY & BRIGHT",pretitle:"MERRY CHRISTMAS",title:"Giáng sinh<br><em>an lành</em>",theme:"theme-christmas",note:"Mùa lễ hội diệu kỳ"}
  ];
  const dateLong = new Intl.DateTimeFormat("vi-VN", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
  const shortDate = (m, d) =>
    `${String(d).padStart(2, "0")}/${String(m).padStart(2, "0")}`;
  const random = (list) => list[Math.floor(Math.random() * list.length)];
  const variants = {
    everyday: [
      "Chúc bạn một ngày mới nhiều năng lượng, công việc thuận lợi, mọi kế hoạch diễn ra suôn sẻ và luôn có những niềm vui nho nhỏ để mỉm cười.",
      "Mong hôm nay mang đến cho bạn sự bình an, những cơ hội tốt và đủ kiên nhẫn để vượt qua thử thách. Chúc mọi việc đều thuận buồm xuôi gió.",
      "Chúc bạn gặp nhiều điều dễ chịu, làm việc thật hanh thông và kết thúc ngày hôm nay với một nụ cười thật tươi.",
      "Mong những điều bạn đang cố gắng sẽ dần có kết quả tốt đẹp. Chúc bạn vững lòng, vui vẻ và luôn tin vào bản thân mình.",
    ],
    weekend: [
      "Chúc bạn có một ngày nghỉ thật thư thái, dành thời gian cho bản thân và những người thương. Mong mọi mệt mỏi đều tan đi, nhường chỗ cho niềm vui và năng lượng mới.",
      "Chúc ngày cuối tuần nhẹ nhàng như một tách trà, vui vẻ như bản nhạc yêu thích và ấm áp bên những người thân yêu.",
    ],
    "new-year": [
      "Chúc bạn năm mới bình an, sức khỏe dồi dào, vạn sự thuận lợi và nhiều niềm vui. Mong những dự định ấp ủ đều có cơ hội nở hoa.",
      "Chúc năm mới mở ra nhiều khởi đầu tốt đẹp, may mắn đồng hành và gia đình luôn mạnh khỏe, sum vầy.",
    ],
    valentine: [
      "Chúc bạn luôn được yêu thương bằng sự chân thành, quan tâm bằng những điều giản dị và có thật nhiều khoảnh khắc khiến trái tim mỉm cười.",
      "Mong tình yêu luôn dịu dàng, chân thành và đủ ấm áp để mỗi ngày đều trở nên đặc biệt.",
    ],
    "women-8-3": [
      "Chúc bạn luôn rạng rỡ, tự tin và hạnh phúc. Mong những điều dịu dàng nhất sẽ đến với bạn hôm nay và trong mọi ngày phía trước.",
      "Chúc một nửa xinh đẹp của thế giới luôn được trân trọng, yêu thương, mạnh mẽ theo cách riêng và tỏa sáng với điều mình đam mê.",
    ],
    liberation: [
      "Chúc bạn và gia đình có kỳ nghỉ lễ vui vẻ, bình an và ý nghĩa. Cùng trân trọng hòa bình, tự do và những giá trị tốt đẹp hôm nay.",
      "Mong dịp lễ này đem đến cho bạn những phút giây sum vầy, nhiều niềm vui và niềm tự hào về quê hương Việt Nam.",
    ],
    labour: [
      "Chúc bạn có kỳ nghỉ thật vui, được nghỉ ngơi trọn vẹn và nạp đầy năng lượng. Mong công sức bạn bỏ ra luôn được đền đáp xứng đáng.",
      "Chúc những người luôn chăm chỉ có một ngày nghỉ thật thoải mái, lòng nhẹ nhàng và nhiều niềm vui bên người thân.",
    ],
    children: [
      "Chúc các bạn nhỏ luôn khỏe mạnh, vui tươi, được yêu thương và thỏa sức khám phá thế giới đầy màu sắc.",
      "Chúc tuổi thơ luôn đầy ắp tiếng cười, những trò chơi thú vị và những giấc mơ đẹp.",
    ],
    national: [
      "Chúc bạn và gia đình có ngày Quốc khánh vui vẻ, bình an. Mong chúng ta luôn trân trọng hòa bình và tự hào về quê hương.",
      "Chúc một ngày lễ ý nghĩa, nhiều niềm vui bên gia đình và thêm yêu những điều bình dị, tốt đẹp của đất nước mình.",
    ],
    "women-20-10": [
      "Nhân ngày Phụ nữ Việt Nam 20/10, kính chúc chị em luôn mạnh khỏe, hạnh phúc, tự tin và tỏa sáng. Mong mỗi ngày đều ngập tràn yêu thương và những điều tốt đẹp.",
      "Chúc các chị em phụ nữ luôn xinh đẹp theo cách riêng, vững vàng trong mọi lựa chọn, được trân trọng và nhận về thật nhiều niềm vui.",
      "Thân chúc toàn thể chị em một ngày 20/10 thật rạng rỡ, nhiều hoa, nhiều tiếng cười và luôn được yêu thương, trân quý.",
    ],
    teachers: [
      "Kính chúc quý thầy cô luôn mạnh khỏe, hạnh phúc và giữ mãi ngọn lửa yêu nghề. Trân trọng cảm ơn sự tận tâm cùng những bài học quý giá.",
      "Nhân ngày Nhà giáo Việt Nam, kính chúc thầy cô nhiều sức khỏe, niềm vui và luôn gặt hái những thành quả đáng tự hào trong sự nghiệp trồng người.",
    ],
    "christmas-eve": [
      "Chúc bạn một đêm Giáng sinh ấm áp, bình an bên những người thân yêu. Mong phép màu nhỏ bé ghé thăm và mang đến thật nhiều nụ cười.",
      "Mong ánh đèn Giáng sinh thắp lên niềm vui, sự bình yên và những điều tốt đẹp trong trái tim bạn.",
    ],
    christmas: [
      "Chúc bạn một mùa Giáng sinh ngập tràn tiếng cười, bình an và yêu thương. Mong những điều tốt đẹp sẽ đến với bạn và những người thân yêu.",
      "Chúc mùa lễ hội của bạn ấm áp, an lành và có thật nhiều khoảnh khắc đáng nhớ bên người thương.",
    ],
    tet: [
      "Chúc bạn và gia đình năm mới an khang, thịnh vượng, dồi dào sức khỏe và vạn sự như ý.",
      "Chúc năm mới tài lộc đủ đầy, gia đình sum vầy, tâm an lòng sáng và mọi việc hanh thông.",
    ],
  };
  function everyday(date) {
    const weekend = [0, 6].includes(date.getUTCDay());
    return {
      id: weekend ? "weekend" : "everyday",
      name: weekend ? "Ngày cuối tuần" : "Lời chúc ngày mới",
      category: weekend ? "A SOFT WEEKEND WISH" : "A FRESH START",
      pretitle: weekend
        ? "CHÚC BẠN NGHỈ NGƠI THẬT VUI"
        : "CHÚC BẠN MỘT NGÀY TỐT LÀNH",
      title: weekend
        ? "Cuối tuần<br><em>thật an yên</em>"
        : "Ngày mới<br><em>thuận lợi nhé!</em>",
      theme: "theme-everyday",
      month: date.getUTCMonth() + 1,
      day: date.getUTCDate(),
      recipient: weekend ? "bạn và những người thân yêu" : "bạn",
    };
  }
  function lunar(date) {
    const lunarDates = {
      2026: { month: 2, day: 17 },
      2027: { month: 2, day: 6 },
    };
    const x = lunarDates[date.getUTCFullYear()];
    if (x && date.getUTCMonth() + 1 === x.month && date.getUTCDate() === x.day)
      return {
        id: "tet",
        name: "Tết Nguyên đán",
        category: "A NEW YEAR OF GOOD FORTUNE",
        pretitle: "KÍNH CHÚC NĂM MỚI",
        title: "Chúc mừng<br><em>năm mới</em>",
        theme: "theme-tet",
        month: x.month,
        day: x.day,
        recipient: "bạn và gia đình",
      };
    return null;
  }
  function forDate(date) {
    return (
      lunar(date) ||
      holidays.find(
        (h) => h.month === date.getUTCMonth() + 1 && h.day === date.getUTCDate(),
      ) ||
      everyday(date)
    );
  }
  let particleTimer = null;
  function petals(id) {
    const field = $("#petalField");
    if (!field) return;
    if (particleTimer) {
      clearInterval(particleTimer);
      particleTimer = null;
    }
    field.innerHTML = "";
    const fireworks = ["tet", "new-year"].includes(id);
    const snow = ["christmas", "christmas-eve"].includes(id);
    const symbols = [
      "women-20-10",
      "women-8-3",
      "teachers",
      "valentine",
    ].includes(id)
      ? ["🌸", "❀", "✿", "🌷"]
      : snow
        ? ["❄", "❅", "❆", "❄"]
        : id === "tet"
          ? ["🌸", "✿", "❀", "🧧"]
          : id === "new-year"
            ? ["✨", "✦", "🎇", "✧"]
            : ["national", "liberation"].includes(id)
              ? ["✦", "🌼", "✧"]
              : id === "children"
                ? ["⭐", "🎈", "✦"]
                : ["❀", "✧", "✿"];
    function spawn() {
      const p = document.createElement("span");
      p.className = fireworks ? "firework" : "falling-petal";
      p.textContent = fireworks
        ? ["🎆", "✨", "🎇", "✦"][Math.floor(Math.random() * 4)]
        : symbols[Math.floor(Math.random() * symbols.length)];
      p.style.left = `${Math.random() * 98}%`;
      p.style.fontSize = `${fireworks ? 18 + Math.random() * 22 : 12 + Math.random() * 18}px`;
      const duration = fireworks
        ? 3.8 + Math.random() * 2.4
        : 7 + Math.random() * 7;
      p.style.animationDuration = `${duration}s`;
      p.style.setProperty(
        "--drift",
        `${Math.round(Math.random() * 180 - 90)}px`,
      );
      if (snow) {
        p.style.color = ["#fff", "#e5f5ff", "#c8e5f7"][
          Math.floor(Math.random() * 3)
        ];
        p.style.textShadow = "0 0 8px #9ccce8aa";
      } else if (
        ["women-20-10", "women-8-3", "teachers", "valentine", "tet"].includes(
          id,
        )
      ) {
        p.style.color = ["#d97998", "#e6a1b4", "#b95c7c"][
          Math.floor(Math.random() * 3)
        ];
      }
      field.appendChild(p);
      p.addEventListener("animationend", () => p.remove(), { once: true });
      // Safety cleanup in case an animation is interrupted by a browser tab change.
      window.setTimeout(() => p.remove(), (duration + 1) * 1000);
    }
    // Pre-fill the screen, then keep adding new particles so the effect never has a gap.
    const initial = fireworks ? 12 : 34;
    for (let i = 0; i < initial; i++) {
      spawn();
      const p = field.lastElementChild;
      if (p) {
        p.style.animationDelay = `-${Math.random() * (fireworks ? 3 : 10)}s`;
      }
    }
    particleTimer = window.setInterval(spawn, fireworks ? 420 : 280);
  }

  function setSeasonVisual(id) {
    const visual = $("#seasonVisual");
    if (!visual) return;

    // Original flower stays untouched for ordinary days and flower-related holidays.
    const defaultFlower = visual.querySelector("#defaultFlowerVisual");
    const christmasIds = ["christmas", "christmas-eve"];

    if (christmasIds.includes(id)) {
      visual.innerHTML = `<img src="./assets/christmas-tree-gifts.png" alt="">`;
      return;
    }

    const art = {
      tet: ["🌸", "🧧", "🌸"],
      "new-year": ["🎆", "✨", "🎇"],
      children: ["🎈", "🧸", "🎈"],
      teachers: ["📚", "🌻", "📖"],
      valentine: ["💗", "💞", "💗"],
      national: ["🇻🇳", "⭐", "🇻🇳"],
      liberation: ["🇻🇳", "🌼", "🇻🇳"],
      labour: ["🌿", "☀️", "🌿"],
    };

    if (art[id]) {
      visual.innerHTML = `<div class="season-emoji-art" aria-hidden="true">
        <span class="big">${art[id][0]}</span>
        <span class="small">${art[id][1]}</span>
        <span class="big">${art[id][2]}</span>
      </div>`;
    } else {
      visual.innerHTML = `<div id="defaultFlowerVisual">${DEFAULT_FLOWER_ART}</div>`;
    }
  }

  const DEFAULT_FLOWER_ART = `<svg viewBox="0 0 320 280">
                        <defs>
                            <linearGradient id="petal" x1="0" y1="0" x2="1" y2="1">
                                <stop stop-color="#ffe7ec" />
                                <stop offset="1" stop-color="#ce5579" />
                            </linearGradient>
                            <linearGradient id="leaf" x1="0" y1="0" x2="1" y2="1">
                                <stop stop-color="#b6cc9e" />
                                <stop offset="1" stop-color="#477153" />
                            </linearGradient>
                        </defs>
                        <path d="M158 270C157 213 176 164 159 111" stroke="#527a59" stroke-width="4" fill="none"
                            stroke-linecap="round" />
                        <path d="M160 210C121 185 94 201 87 229C122 232 146 222 160 210Z" fill="url(#leaf)" />
                        <path d="M165 174C194 139 225 145 241 166C210 188 184 184 165 174Z" fill="url(#leaf)" />
                        <path d="M160 240C190 216 214 220 224 240C198 252 177 251 160 240Z" fill="url(#leaf)" />
                        <g transform="translate(158 80)">
                            <ellipse cy="-31" rx="20" ry="37" fill="url(#petal)" />
                            <ellipse cy="-31" rx="20" ry="37" fill="url(#petal)" transform="rotate(45)" />
                            <ellipse cy="-31" rx="20" ry="37" fill="url(#petal)" transform="rotate(90)" />
                            <ellipse cy="-31" rx="20" ry="37" fill="url(#petal)" transform="rotate(135)" />
                            <ellipse cy="-22" rx="17" ry="31" fill="#e9819e" transform="rotate(22)" />
                            <ellipse cy="-22" rx="17" ry="31" fill="#e9819e" transform="rotate(67)" />
                            <ellipse cy="-22" rx="17" ry="31" fill="#e9819e" transform="rotate(112)" />
                            <ellipse cy="-22" rx="17" ry="31" fill="#e9819e" transform="rotate(157)" />
                            <circle r="17" fill="#a94465" />
                            <path d="M-9 -2C-7 -15 10 -15 12 -2C10 9 -6 11 -9 -2Z" fill="#f7bd76" />
                        </g>
                        <g transform="translate(86 146) scale(.5)">
                            <ellipse cy="-31" rx="20" ry="37" fill="#f6bdca" />
                            <ellipse cy="-31" rx="20" ry="37" fill="#df7892" transform="rotate(45)" />
                            <ellipse cy="-31" rx="20" ry="37" fill="#f6bdca" transform="rotate(90)" />
                            <ellipse cy="-31" rx="20" ry="37" fill="#df7892" transform="rotate(135)" />
                            <circle r="15" fill="#c67a46" />
                        </g>
                        <g transform="translate(232 119) scale(.4)">
                            <ellipse cy="-31" rx="20" ry="37" fill="#fff0c6" />
                            <ellipse cy="-31" rx="20" ry="37" fill="#f4c56f" transform="rotate(45)" />
                            <ellipse cy="-31" rx="20" ry="37" fill="#fff0c6" transform="rotate(90)" />
                            <ellipse cy="-31" rx="20" ry="37" fill="#f4c56f" transform="rotate(135)" />
                            <circle r="15" fill="#a96d39" />
                        </g>
                        <g fill="#fff" opacity=".9">
                            <circle cx="52" cy="78" r="3" />
                            <circle cx="258" cy="53" r="4" />
                            <circle cx="270" cy="198" r="2.5" />
                            <path d="M48 168l3 7 7 3-7 3-3 7-3-7-7-3 7-3Z" />
                        </g>
                    </svg>`;

  function setCard(item, date = today) {
    const id = item.id || "everyday";
    const pool = variants[id] || variants.everyday;
    const message = random(pool);
    $("#greetingCard").className =
      `greeting-card ${item.theme || "theme-everyday"}`;
    $("#cardCategory").textContent = item.category || "A LITTLE NOTE FOR YOU";
    $("#cardDate").textContent =
      `${shortDate(item.month ?? date.getUTCMonth() + 1, item.day ?? date.getUTCDate())}/${date.getUTCFullYear()}`;
    $("#cardPretitle").textContent =
      item.pretitle || "MỘT LỜI CHÚC DÀNH CHO BẠN";
    $("#cardTitle").innerHTML =
      item.title || "Chúc bạn<br><em>một ngày đẹp</em>";
    $("#greetingMessage").textContent = message;
    $("#cardYear").textContent = date.getUTCFullYear();
    const recipients = {
      "women-20-10": "chị em phụ nữ",
      "women-8-3": "chị em phụ nữ",
      teachers: "quý thầy cô",
      children: "các bạn nhỏ",
      valentine: "những người đang yêu và được yêu",
      tet: "bạn và gia đình",
      "new-year": "bạn và gia đình",
      christmas: "bạn và gia đình",
      "christmas-eve": "bạn và gia đình",
      liberation: "bạn và gia đình",
      national: "bạn và gia đình",
      labour: "những người lao động",
    };
    $("#recipientLine").innerHTML =
      `Thân gửi <span>${item.recipient || recipients[id] || "bạn"}</span>`;
    setSeasonVisual(id);
    petals(id);
    $("#introEyebrow").textContent =
      item.id === "women-20-10"
        ? "✦ CHÚC MỪNG NGÀY PHỤ NỮ VIỆT NAM ✦"
        : item.id === "teachers"
          ? "✦ TRI ÂN NHỮNG NGƯỜI ĐƯA ĐÒ ✦"
          : "✦ MỘT LỜI CHÚC NHỎ ✦";
    $("#introTitle").innerHTML =
      item.id === "women-20-10"
        ? "Gửi những đóa hoa,<br><em>lời chúc trân quý.</em>"
        : item.id === "teachers"
          ? "Lời tri ân nhỏ,<br><em>tấm lòng lớn.</em>"
          : "Một lời chúc nhỏ,<br><em>một ngày thật đẹp.</em>";
    $("#introCopy").textContent =
      item.id === "women-20-10"
        ? "Kính chúc toàn thể chị em phụ nữ luôn hạnh phúc, rạng rỡ và được trân trọng mỗi ngày."
        : item.id === "teachers"
          ? "Một lời chúc chân thành gửi đến quý thầy cô nhân ngày đặc biệt."
          : "Một lời chúc ngẫu nhiên dành riêng cho khoảnh khắc bạn ghé thăm.";
  }
  $("#todayLabel").textContent = dateLong.format(today);
  setCard(forDate(today), today);
})();
