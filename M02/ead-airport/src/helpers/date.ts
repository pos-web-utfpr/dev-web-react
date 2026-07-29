export function formatDate(isoString: string): string {
  const date = new Date(isoString);
  
  const formattedDate = date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  });

  const formattedTime = date.toLocaleTimeString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return `${formattedDate} - ${formattedTime}`;
}
