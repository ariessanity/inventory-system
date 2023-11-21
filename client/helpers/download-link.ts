const downloadExcelFile = (data: any, fileName: string) => {
  if (data) {
    const currentDate = new Date().toISOString().slice(0, 10);
    const url = window.URL.createObjectURL(new Blob([data]));
    const link = document.createElement("a");

    link.href = url;
    link.setAttribute("download", `${fileName}_${currentDate}.xlsx`);
    document.body.appendChild(link);
    link.click();

    setTimeout(() => {
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    }, 100);
  }
};

export default downloadExcelFile;
