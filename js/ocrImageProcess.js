"use strict";

/**
 * 画像ファイルを読み込み、OCRでテキストを抽出して表示する関数
 * @returns {void}
 */
function ocrImageProcess() {
	const fileInput = document.createElement("input");
	fileInput.type = "file";
	fileInput.accept = "image/*";

	fileInput.onchange = function () {
		const file = fileInput.files[0];
		const ocrReader = new FileReader();
		ocrReader.onload = function (e) {
			Tesseract.recognize(e.target.result, "eng", { logger: (m) => console.log(m) }).then(({ data: { text } }) => {
				ocrReadText = text.replace(/[^\w- .,?]/g, " ");
				document.getElementById("textDisplayArea").innerHTML += ocrReadText + "<br/>";
			});
		};
		ocrReader.readAsDataURL(file);
	};

	fileInput.click();
}
