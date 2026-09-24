// ============ EXPORT TO CSV ============
export const exportToCSV = (data, filename = 'export', headers = null) => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  // Use provided headers or infer from first object
  const keys = headers ? headers.map(h => h.key) : Object.keys(data[0]);
  const labels = headers ? headers.map(h => h.label) : keys;

  // Build CSV content
  const csvRows = [];
  
  // Header row
  csvRows.push(labels.map(label => `"${label}"`).join(','));
  
  // Data rows
  data.forEach(row => {
    const values = keys.map(key => {
      let value = row[key];
      
      // Handle nested objects
      if (value && typeof value === 'object') {
        if (value.firstName) {
          value = `${value.firstName} ${value.lastName || ''}`.trim();
        } else if (value.name) {
          value = value.name;
        } else {
          value = JSON.stringify(value);
        }
      }
      
      // Handle null/undefined
      if (value === null || value === undefined) value = '';
      
      // Handle dates
      if (value instanceof Date) {
        value = value.toISOString().split('T')[0];
      }
      
      // Escape quotes
      return `"${String(value).replace(/"/g, '""')}"`;
    });
    csvRows.push(values.join(','));
  });

  const csvContent = csvRows.join('\n');
  
  // Create and download file
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);
  
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ============ EXPORT TO JSON ============
export const exportToJSON = (data, filename = 'export') => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const jsonContent = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonContent], { type: 'application/json' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}_${new Date().toISOString().split('T')[0]}.json`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

// ============ EXPORT TO PRINT/PDF ============
export const exportToPDF = (title, data, headers) => {
  if (!data || data.length === 0) {
    alert('No data to export');
    return;
  }

  const printWindow = window.open('', '_blank');
  
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          padding: 40px;
          color: #111827;
        }
        .header {
          margin-bottom: 30px;
          padding-bottom: 20px;
          border-bottom: 3px solid #2563eb;
        }
        .header h1 {
          font-size: 28px;
          font-weight: 700;
          color: #111827;
          margin-bottom: 8px;
        }
        .header p {
          color: #6b7280;
          font-size: 14px;
        }
        .meta {
          margin-bottom: 30px;
          padding: 15px;
          background: #f3f4f6;
          border-radius: 8px;
          font-size: 13px;
          color: #374151;
        }
        table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13px;
        }
        th {
          background: #2563eb;
          color: white;
          padding: 12px;
          text-align: left;
          font-weight: 600;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        th:first-child { border-top-left-radius: 8px; }
        th:last-child { border-top-right-radius: 8px; }
        td {
          padding: 12px;
          border-bottom: 1px solid #e5e7eb;
        }
        tr:nth-child(even) td { background: #f9fafb; }
        tr:last-child td { border-bottom: none; }
        .footer {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #e5e7eb;
          text-align: center;
          color: #9ca3af;
          font-size: 11px;
        }
        @media print {
          body { padding: 20px; }
          .no-print { display: none; }
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>${title}</h1>
        <p>Wayfare - Corporate Travel Management</p>
      </div>
      
      <div class="meta">
        <strong>Generated:</strong> ${new Date().toLocaleString()}<br>
        <strong>Total Records:</strong> ${data.length}
      </div>
      
      <table>
        <thead>
          <tr>
            ${headers.map(h => `<th>${h.label}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${data.map(row => `
            <tr>
              ${headers.map(h => {
                let value = row[h.key];
                if (value && typeof value === 'object') {
                  if (value.firstName) {
                    value = `${value.firstName} ${value.lastName || ''}`.trim();
                  } else if (value.name) {
                    value = value.name;
                  } else {
                    value = '-';
                  }
                }
                if (value === null || value === undefined) value = '-';
                return `<td>${value}</td>`;
              }).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} Wayfare. All rights reserved.</p>
        <p style="margin-top: 5px;">This document was generated automatically by Wayfare.</p>
      </div>
    </body>
    </html>
  `;

  printWindow.document.write(htmlContent);
  printWindow.document.close();
  
  setTimeout(() => {
    printWindow.print();
  }, 500);
};

// ============ UNIVERSAL EXPORT WITH MENU ============
export const showExportMenu = (data, filename, headers, title) => {
  const choice = window.prompt(
    'Choose export format:\n\n1. CSV (Excel compatible)\n2. JSON (data backup)\n3. PDF (printable report)\n\nEnter 1, 2, or 3:',
    '1'
  );

  switch (choice) {
    case '1':
      exportToCSV(data, filename, headers);
      break;
    case '2':
      exportToJSON(data, filename);
      break;
    case '3':
      exportToPDF(title || filename, data, headers);
      break;
    default:
      break;
  }
};