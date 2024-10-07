interface Text {
  id: number;
  content: string;
  level: 'easy' | 'medium' | 'hard';
}

const texts: Text[] = [];
let currentId = 1;

export const getAllTexts = (): Text[] => texts;

export const getTextsByLevel = (level: 'easy' | 'medium' | 'hard'): Text[] => 
  texts.filter(text => text.level === level);

export const getTextById = (id: number): Text | undefined => 
  texts.find(text => text.id === id);

export const createText = (content: string, level: 'easy' | 'medium' | 'hard'): Text => {
  const newText: Text = { id: currentId, content, level };
  texts.push(newText);
  currentId++;
  return newText;
};

export const updateText = (id: number, content: string, level: 'easy' | 'medium' | 'hard'): Text | undefined => {
  const index = texts.findIndex(text => text.id === id);
  if (index === -1) return undefined;
  texts[index] = { id, content, level };
  return texts[index];
};

export const deleteText = (id: number): boolean => {
  const index = texts.findIndex(text => text.id === id);
  if (index === -1) return false;
  texts.splice(index, 1);
  return true;
};
