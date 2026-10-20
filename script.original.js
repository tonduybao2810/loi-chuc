(() => {
  const $ = (s) => document.querySelector(s),
    holidays = window.HOLIDAYS || [],
    today = new Date();
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
    const weekend = [0, 6].includes(date.getDay());
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
      month: date.getMonth() + 1,
      day: date.getDate(),
      recipient: weekend ? "bạn và những người thân yêu" : "bạn",
    };
  }
  function lunar(date) {
    const x = window.LUNAR_DATES?.[date.getFullYear()];
    if (x && date.getMonth() + 1 === x.month && date.getDate() === x.day)
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
        (h) => h.month === date.getMonth() + 1 && h.day === date.getDate(),
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

  function setCard(item, date = today) {
    const id = item.id || "everyday";
    const pool = variants[id] || variants.everyday;
    const message = random(pool);
    $("#greetingCard").className =
      `greeting-card ${item.theme || "theme-everyday"}`;
    $("#cardCategory").textContent = item.category || "A LITTLE NOTE FOR YOU";
    $("#cardDate").textContent =
      `${shortDate(item.month ?? date.getMonth() + 1, item.day ?? date.getDate())}/${date.getFullYear()}`;
    $("#cardPretitle").textContent =
      item.pretitle || "MỘT LỜI CHÚC DÀNH CHO BẠN";
    $("#cardTitle").innerHTML =
      item.title || "Chúc bạn<br><em>một ngày đẹp</em>";
    $("#greetingMessage").textContent = message;
    $("#cardYear").textContent = date.getFullYear();
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
    const flower = $(".flower-art");
    if (flower)
      flower.style.filter = ["christmas", "christmas-eve"].includes(id)
        ? "hue-rotate(90deg)"
        : ["tet", "new-year", "national"].includes(id)
          ? "hue-rotate(-25deg)"
          : "none";
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
