// dataProcessing.ts
export function processDailyData(rawData: any): {average: number, max: number, min: number} | null {
    if (!rawData || !Array.isArray(rawData)) {
      return null;
    }
  
    let sum = 0;
    let max = -Infinity;
    let min = Infinity;
  
    rawData.forEach((data: any) => {
      if (data && typeof data.value === 'number') {
        sum += data.value;
        max = Math.max(max, data.value);
        min = Math.min(min, data.value);
      }
    });
  
    const average = sum / rawData.length;
  
    return {average, max, min};
  }