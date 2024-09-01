"use strict";

/**
 *  OCRから変換したテキストから、JACET8000にリストされているファイルを抽出し、JACET番号(難易度)と出現頻度順で表示する関数
 * @returns {void}
 */
function processConvertedText() {
	const ocrReadWords = ocrReadText.toLowerCase().split(/\s+/);
	const jacetWords = ocrReadWords.filter((word) => wordToJACETNumber[word]);

	wordCounts = jacetWords.reduce((accumulator, word) => {
		accumulator[word] = (accumulator[word] || 0) + 1;
		return accumulator;
	}, {});

	const sortedWords = Object.entries(wordCounts)
		.sort((a, b) => b[1] - a[1])
		.map(([word, count]) => {
			let jacetNumber = wordToJACETNumber[word];
			jacetNumber = Math.round(jacetNumber / 1000) + 1;
			return `単語: ${word} | 回数: ${count} | 難易度: ${jacetNumber}`;
		});

	const textDisplayArea = document.getElementById("textDisplayArea");
	textDisplayArea.innerHTML += "<br/><strong>出現頻度順に並べ替えた単語 (JACET8000番号付き):</strong><br/>";
	sortedWords.forEach((line) => {
		textDisplayArea.innerHTML += line + "<br/>";
	});
}
