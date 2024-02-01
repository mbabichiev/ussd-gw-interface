import React from 'react';

const FormattedText = ({ text }) => {
    // Разделители, которые нужно выделить
    const separators = ["{MSISDN}", "{DIALOGID}", "{SHORTCODE}"];

    // Функция для разбивки текста
    const splitText = (inputText) => {
        let parts = [inputText];
        separators.forEach(separator => {
            parts = parts.flatMap(part => 
                part.split(separator).flatMap((splitPart, index, array) =>
                    array.length - 1 !== index ? [splitPart, separator] : splitPart
                )
            );
        });
        return parts;
    };

    // Разбиваем текст
    const parts = splitText(text);

    // Рендерим каждую часть с нужным стилем
    return parts.map((part, index) => {
        const key = `part-${index}`;
        if (separators.includes(part)) {
            return <span key={key} style={{ color: "red" }}>{part}</span>;
        } else {
            return <span key={key}>{part}</span>;
        }
    });
};

export default FormattedText;
