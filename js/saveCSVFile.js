"use strict";

/**
 * CSVファイルを作成し、ダウンロードする関数
 * @returns {void}
 */
function saveCSVFile() {
	let csvContent = "番号,頻度,単語\n";

	for (const [word, count] of Object.entries(wordCounts)) {
		const jacetNumber = wordToJACETNumber[word] || "該当なし";
		csvContent += `${jacetNumber},${count},${word}\n`;
	}

	const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
	const link = document.createElement("a");
	if (link.download !== undefined) {
		const url = URL.createObjectURL(blob);
		link.setAttribute("href", url);
		link.setAttribute("download", "word_frequencies.csv");
		link.style.visibility = "hidden";
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	}
}
