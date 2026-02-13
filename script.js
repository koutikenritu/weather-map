window.onload = function() {

  const apiKey = "3524f54362e676188c965584c889edd8"; // ← 自分のキーを入れる

  const cities = [
    { name: "東京", lat: 35.6895, lon: 139.6917 },
    { name: "大阪", lat: 34.6937, lon: 135.5023 },
    { name: "札幌", lat: 43.0618, lon: 141.3545 },
    { name: "福岡", lat: 33.5902, lon: 130.4017 },
    { name: "高知", lat: 33.5597, lon: 133.5311 },
    { name: "神戸", lat: 34.6901, lon: 135.1955 },
    { name: "岩手", lat: 39.7036, lon: 141.1527 },
    { name: "那覇", lat: 26.2124, lon: 127.6809 }
  ];

  const map = L.map('map').setView([36.2048, 138.2529], 5);

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  cities.forEach(function(city) {

    const marker = L.marker([city.lat, city.lon]).addTo(map);

    marker.on("click", function() {

      const infoBox = document.getElementById("info");
      infoBox.innerText = "取得中...";

      fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${city.lat}&lon=${city.lon}&units=metric&lang=ja&appid=${apiKey}`)
        .then(response => response.json())
        .then(data => {

          const icon = data.weather[0].icon;

          infoBox.innerHTML = `
            <h3>${city.name}</h3>
            <img src="https://openweathermap.org/img/wn/${icon}@2x.png" alt="天気アイコン">
            <p>気温: ${data.main.temp}℃</p>
            <p>${data.weather[0].description}</p>
          `;

          // 都市をズーム
          map.setView([city.lat, city.lon], 8);

        })
        .catch(error => {
          console.log("エラー:", error);
          infoBox.innerText = "天気取得に失敗しました";
        });

    });

  });

};
