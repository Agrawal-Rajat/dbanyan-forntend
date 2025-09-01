export const printData = (title, headers, dataRows, logoUrl) => {
  const tableHeaders = headers.map(header => `<th>${header}</th>`).join("");

  const tableRows = dataRows
    .map(row => `<tr>${row.map(cell => `<td>${cell}</td>`).join("")}</tr>`)
    .join("");

  const style = `
    <style>
      body {
        font-family: 'Arial', sans-serif;
        padding: 40px;
        margin: 0;
        background: white;
      }
      .header {
        text-align: center;
        margin-bottom: 20px;
      }
      .logo {
        max-width: 150px;
        height: auto;
        margin-bottom: 10px;
      }
      h1 {
        margin: 0;
        color: #000;
      }
      table {
        width: 100%;
        border-collapse: collapse;
        font-size: 16px;
        margin-top: 30px;
      }
      th, td {
        border: 1px solid #333;
        padding: 8px 12px;
        text-align: left;
      }
      th {
        background-color: #f2f2f2;
      }
    </style>
  `;

  const logoHtml = logoUrl ? `<img src="${logoUrl}" class="logo" alt="Company Logo" />` : "";

  const printContent = `
    <html>
      <head>
        <title>${title}</title>
        ${style}
      </head>
      <body>
        <div class="header">
          ${logoHtml}
          <h1>${title}</h1>
        </div>
        <table>
          <thead><tr>${tableHeaders}</tr></thead>
          <tbody>${tableRows}</tbody>
        </table>
      </body>
    </html>
  `;

  const newWindow = window.open("", "", "width=800,height=600");
  newWindow.document.write(printContent);
  newWindow.document.close();
  newWindow.focus();
  newWindow.print();
  newWindow.close();
};
