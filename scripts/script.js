document.getElementById('file').addEventListener('change', async function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = async function(e) {
            const arrayBuffer = e.target.result;
            const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
            let textContent = '';
            for (let i = 0; i < pdf.numPages; i++) {
                const page = await pdf.getPage(i + 1);
                const textContentPage = await page.getTextContent();
                textContentPage.items.forEach(item => {
                    textContent += item.str + ' ';
                });
                textContent += '\n';
            }
            document.getElementById('output').textContent = textContent;
        };
        reader.readAsArrayBuffer(file);
    }
});