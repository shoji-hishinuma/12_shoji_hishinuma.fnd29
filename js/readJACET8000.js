"use strict";

/**
 * JACET8000.jsonファイルを読み込み、処理する関数
 * @returns {void}
 */
let ocrReadText = "";
let wordToJACETNumber = {};
let wordCounts = {};

function readJACET8000() {
	const jacetFileInput = document.createElement("input");
	jacetFileInput.type = "file";
	jacetFileInput.accept = ".json";

	jacetFileInput.onchange = function (event) {
		const file = event.target.files[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = function (e) {
			let jacet8000 = JSON.parse(e.target.result);

			wordToJACETNumber = jacet8000.reduce((map, entry) => {
				map[entry.Word.toLowerCase()] = entry.JACET_Number;
				return map;
			}, {});

			alert("JACET8000.jsonを読み込みました。");
		};
		reader.readAsText(file);
	};

	jacetFileInput.click();
}
