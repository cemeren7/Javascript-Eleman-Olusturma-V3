// Elemanları sırası ile şeç
const frm = document.querySelector("#div-frm");
const divcontainer = document.querySelector("#div-ctn");
const dvctn = document.querySelector("#div-count");
const dvclr = document.querySelector("#div-color");
const dvwtdh = document.querySelector("#div-width");
const dvhght = document.querySelector("#div-height");
const alertdv = document.querySelector("#alert");

// olayları çalıştırma
runevent();

function runevent() {
  frm.addEventListener("submit", adddiv);
  frm.addEventListener("reset", removediv);
}

function adddiv(e) {
  e.preventDefault(); // Bu Özellik Çok Önemli
  const countdiv = dvctn.value.trim(); // inputta bulunan degeri sagındaki ve solundaki boslukları kaldırarak alır
  const numberdiv = Number(countdiv); // input üzerinden aldıgımız degeri int dönüştürüyrerek alırız
  const colordiv = dvclr.value.trim();
  const widthdiv = dvwtdh.value.trim();
  const heightdiv = dvhght.value.trim();

  if (numberdiv == "" || colordiv == "" || widthdiv == "" || heightdiv == "") {
    alertswhow("Lütfen Eksik Eleman Bilgisi Girmediginize Emin Olun");
  } else {
    divcreat(numberdiv, colordiv, widthdiv, heightdiv); // inputtan aldıgı degerleri sırayla parametre olarak divcreat adlı methoda gönderir
  }
}

function divcreat(count, ColorDiv, Widthdiv, HeightDiv) {
  // method tarafında gelen parametreler sırası ile localstroge eklenir fakat dikkat güncel olarak dizi şeklinde eklenmez
  localStorage.setItem("Div Sayısı", count); // div sayısı key iken count  value dur
  localStorage.setItem("Div Renkleri", ColorDiv);
  localStorage.setItem("Div Genişlikleri", Widthdiv);
  localStorage.setItem("Div Yükseklikleri", HeightDiv);

  if (HeightDiv >= 500 || Widthdiv >= 500) {
    // input tarafından bu methoda gönderilen degerleri  kontrol eder
    // inputlar üzerinden gelen degerlern parametre aracılıgı ile kontrol edilir
    alertswhow(
      "Yükseklik Veya Genişlik Olarak 500 ve 500 den büyük deger giremezsiniz"
    );
  } else {
    for (let i = 0; i < count; i++) {
      const creatdv = document.createElement("div");
      creatdv.style.width = `${Widthdiv}px`; // px degeri gelecegini unutma
      creatdv.style.height = `${HeightDiv}px`;
      creatdv.style.backgroundColor = ColorDiv;
      creatdv.className = "crtdiv";
      creatdv.style.borderRadius = "8px";
      creatdv.style.boxShadow = "2px 2px 5px rgba(0, 0, 0, 0.2)";
      creatdv.style.transition = "transform 0.3s ease";

      creatdv.addEventListener("mouseover", () => {
        // oluşturulan div mouse ile üzerine gelince çalışcak bir olay eklenir
        creatdv.style.transform = "translateY(-5px)";
      });

      creatdv.addEventListener("mouseout", function () {
        creatdv.style.transform = "scale(1)";
      });
      divcontainer.appendChild(creatdv); // burada oluşturdugumuz creat div adında elemanımız divcontainer adlı yapının alt elemanıdır
    }
  }
  dvctn.value = "";
  dvclr.value = "";
  dvwtdh.value = "";
  dvhght.value = "";
}

function alertswhow(message) {
  const div = document.createElement("div");
  div.textContent = message;
  div.className = "alert-contact";
  alertdv.appendChild(div);

  setTimeout(function () {
    div.remove();
  }, 2500);
}

function removediv() {
  const divs = document.querySelectorAll(".crtdiv");

  if (divs.length > 0) {
    // forda kullanilabilir
    divs.forEach(function (div) {
      div.remove();
    });
  } else {
    alertswhow("Ekranda Temizleme İşlemi Yapmak İçin En Az Bir Eleman Olmalı");
  }
}
