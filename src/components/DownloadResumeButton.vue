<!-- src/components/DownloadResumeButton.vue -->

<template>
  <div class="download-resume-button">
    <button @click="downloadResume">
      {{ buttonTitle }}
    </button>
  </div>
</template>

<script>
import html2pdf from "html2pdf.js";

export default {
  props: {
    buttonTitle: {
      type: String,
      required: true,
    },
  },
  methods: {
    downloadResume() {
      // Пробуем захватить элемент с резюме
      const resumePage = document.getElementById("cv-page"); // Убедись, что у тебя есть элемент с id="cv-page"

      // Логируем, чтобы проверить, что элемент найден
      if (!resumePage) {
        console.error(
          "Резюме не найдено! Убедитесь, что элемент с id='cv-page' существует."
        );
        return;
      } else {
        console.log("Элемент найден: ", resumePage); // Логируем, что элемент найден
      }

      // Опции для pdf
      const opt = {
        margin: 10,
        filename: "resume.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 4, logging: true },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      };

      // Генерация PDF
      html2pdf()
        .from(resumePage) // Указываем элемент
        .set(opt)
        .save() // Сохраняем PDF
        .then(() => console.log("PDF успешно сохранен!")) // Подтверждаем успешное сохранение
        .catch((err) => console.error("Ошибка при сохранении PDF: ", err)); // Логируем ошибки
    },
  },
};
</script>

<style scoped>
.download-resume-button button {
  padding: 10px 20px;
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.download-resume-button button:hover {
  background-color: #45a049;
}
</style>
