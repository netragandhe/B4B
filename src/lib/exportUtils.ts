/**
 * Utility functions for exporting data tables to CSV and PDF/Print formats
 */

export function exportToCsv(filename: string, headers: string[], rows: (string | number | boolean)[][]) {
  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [headers.join(','), ...rows.map((e) => e.map((val) => `"${String(val).replace(/"/g, '""')}"`).join(','))].join('\n')

  const encodedUri = encodeURI(csvContent)
  const link = document.createElement('a')
  link.setAttribute('href', encodedUri)
  link.setAttribute('download', `${filename.toLowerCase().replace(/\s+/g, '_')}.csv`)
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

export function exportToPdf(title: string, headers: string[], rows: (string | number | boolean)[][]) {
  const printWindow = window.open('', '_blank')
  if (!printWindow) return

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>${title}</title>
        <style>
          body { font-family: system-ui, -apple-system, sans-serif; padding: 24px; color: #0f172a; }
          h2 { color: #0f172a; border-bottom: 2px solid #2563eb; padding-bottom: 8px; margin-bottom: 4px; }
          p.meta { font-size: 11px; color: #64748b; margin-bottom: 16px; }
          table { width: 100%; border-collapse: collapse; font-size: 12px; }
          th, td { border: 1px solid #cbd5e1; padding: 8px 12px; text-align: left; }
          th { background-color: #f1f5f9; font-weight: 600; color: #334155; }
          tr:nth-child(even) { background-color: #f8fafc; }
          .footer { margin-top: 24px; font-size: 10px; color: #64748b; text-align: right; border-top: 1px solid #e2e8f0; padding-top: 8px; }
        </style>
      </head>
      <body>
        <h2>${title}</h2>
        <p class="meta">Generated on ${new Date().toLocaleString()} | Super Admin Export</p>
        <table>
          <thead>
            <tr>${headers.map((h) => `<th>${h}</th>`).join('')}</tr>
          </thead>
          <tbody>
            ${rows.map((row) => `<tr>${row.map((cell) => `<td>${cell}</td>`).join('')}</tr>`).join('')}
          </tbody>
        </table>
        <div class="footer">Confidential • For Internal B4B Platform Use Only</div>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
    </html>
  `
  printWindow.document.write(html)
  printWindow.document.close()
}
