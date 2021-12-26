import xlsx from "xlsx";

export default class SpreadsheetParser {
  async parse(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = function (event) {
        const data = event.target.result;
        const workbook = xlsx.read(data, {
          type: 'binary'
        });

        workbook.SheetNames.forEach(function (sheetName) {
          const items = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
          resolve(items);
        })

      };

      reader.onerror = function (e) {
        console.error(e);
        reject(e);
      };

      reader.readAsBinaryString(file);
    });
  }

  // workbookToBlob(workbook) {
  //   const opts = {bookType: 'xlsx', bookSST: false, type: 'base64'};
  //   const out = xlsx.write(workbook, opts);
  //   const blob = new Blob([this._s2ab(atob(out))], {type: 'application/octet-stream'});
  //   return blob;
  // }
  //
  // toBlob(file) {
  //   const blob = new Blob([this._s2ab(atob(file))], {type: 'application/octet-stream'});
  //   return blob;
  // }
  //
  // _s2ab(s) {
  //   const buf = new ArrayBuffer(s.length);
  //   const view = new Uint8Array(buf);
  //   for (let i = 0; i < s.length; i++) {
  //     view[i] = s.charCodeAt(i) & 0xFF;
  //   }
  //   return buf;
  // }
}