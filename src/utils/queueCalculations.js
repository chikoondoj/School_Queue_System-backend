class QueueCalculations {
  static calculateEstimatedWaitTime(position, averageServiceTime, currentlyServing = 1) {
    if (position <= 0) return 0;
    
    const baseWaitTime = (position - 1) * averageServiceTime;
    const bufferTime = baseWaitTime * 0.15;
    
    return Math.round(baseWaitTime + bufferTime);
  }

  static calculateAverageServiceTime(completedTickets) {
    if (!completedTickets || completedTickets.length === 0) {
      return 300;
    }

    const serviceTimes = completedTickets.map(ticket => {
      const startTime = new Date(ticket.calledAt || ticket.createdAt);
      const endTime = new Date(ticket.completedAt);
      return (endTime - startTime) / 1000;
    });

    const totalTime = serviceTimes.reduce((sum, time) => sum + time, 0);
    return Math.round(totalTime / serviceTimes.length);
  }

  static calculateWeightedAverageServiceTime(recentTickets, allTickets) {
    const recentAverage = this.calculateAverageServiceTime(recentTickets);
    const overallAverage = this.calculateAverageServiceTime(allTickets);
    
    const recentWeight = 0.7;
    const overallWeight = 0.3;
    
    return Math.round((recentAverage * recentWeight) + (overallAverage * overallWeight));
  }

  static calculateQueueVelocity(ticketsInLastHour) {
    if (!ticketsInLastHour || ticketsInLastHour.length === 0) {
      return 1;
    }
    
    return ticketsInLastHour.length;
  }

  static calculatePeakHours(ticketHistory) {
    const hourCounts = {};
    
    ticketHistory.forEach(ticket => {
      const hour = new Date(ticket.createdAt).getHours();
      hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const sortedHours = Object.entries(hourCounts)
      .sort(([,a], [,b]) => b - a)
      .map(([hour]) => parseInt(hour));

    return sortedHours.slice(0, 3);
  }

  static calculateWaitTimeAccuracy(predictions, actualWaitTimes) {
    if (predictions.length !== actualWaitTimes.length || predictions.length === 0) {
      return 0;
    }

    const accuracies = predictions.map((predicted, index) => {
      const actual = actualWaitTimes[index];
      const difference = Math.abs(predicted - actual);
      const accuracy = Math.max(0, 1 - (difference / Math.max(predicted, actual)));
      return accuracy;
    });

    const totalAccuracy = accuracies.reduce((sum, acc) => sum + acc, 0);
    return totalAccuracy / accuracies.length;
  }

  static calculateOptimalServiceTime(historicalData, currentLoad) {
    const baseServiceTime = this.calculateAverageServiceTime(historicalData);
    
    const loadFactor = currentLoad > 10 ? 1.2 : currentLoad > 5 ? 1.1 : 1.0;
    
    return Math.round(baseServiceTime * loadFactor);
  }

  static calculateQueueHealthScore(queueData) {
    const {
      currentLength,
      averageWaitTime,
      completionRate,
      abandonmentRate,
      serviceTime
    } = queueData;

    let score = 100;

    if (currentLength > 20) score -= 30;
    else if (currentLength > 10) score -= 15;
    else if (currentLength > 5) score -= 5;

    if (averageWaitTime > 1800) score -= 25;
    else if (averageWaitTime > 900) score -= 15;
    else if (averageWaitTime > 300) score -= 5;

    if (completionRate < 0.8) score -= 20;
    else if (completionRate < 0.9) score -= 10;

    if (abandonmentRate > 0.2) score -= 20;
    else if (abandonmentRate > 0.1) score -= 10;

    if (serviceTime > 600) score -= 15;
    else if (serviceTime > 300) score -= 5;

    return Math.max(0, Math.min(100, score));
  }

  static calculateDynamicWaitTime(position, queueVelocity, timeOfDay, historicalData) {
    const baseTime = this.calculateEstimatedWaitTime(position, 300);
    
    let multiplier = 1.0;
    
    if (timeOfDay >= 9 && timeOfDay <= 11) multiplier = 1.3;
    else if (timeOfDay >= 13 && timeOfDay <= 15) multiplier = 1.2;
    else if (timeOfDay >= 16 && timeOfDay <= 17) multiplier = 1.4;
    
    const velocityMultiplier = queueVelocity > 0 ? 1 / queueVelocity : 1.5;
    
    const adjustedTime = baseTime * multiplier * velocityMultiplier;
    
    return Math.round(adjustedTime);
  }

  static generateQueueForecast(currentData, historicalPatterns) {
    const forecast = {};
    const currentHour = new Date().getHours();
    
    for (let i = 1; i <= 6; i++) {
      const forecastHour = (currentHour + i) % 24;
      const historicalAverage = historicalPatterns[forecastHour] || currentData.currentLength;
      
      const trend = this.calculateTrend(currentData.recentTickets);
      const seasonalFactor = this.getSeasonalFactor(forecastHour);
      
      forecast[forecastHour] = Math.round(
        historicalAverage * (1 + trend) * seasonalFactor
      );
    }
    
    return forecast;
  }

  static calculateTrend(recentData) {
    if (recentData.length < 2) return 0;
    
    const firstHalf = recentData.slice(0, Math.floor(recentData.length / 2));
    const secondHalf = recentData.slice(Math.floor(recentData.length / 2));
    
    const firstAvg = firstHalf.length / firstHalf.length;
    const secondAvg = secondHalf.length / secondHalf.length;
    
    return (secondAvg - firstAvg) / firstAvg;
  }

  static getSeasonalFactor(hour) {
    const factors = {
      8: 1.2, 9: 1.4, 10: 1.3, 11: 1.1,
      12: 0.8, 13: 1.2, 14: 1.3, 15: 1.1,
      16: 1.0, 17: 0.9, 18: 0.7, 19: 0.5
    };
    
    return factors[hour] || 0.8;
  }
}

module.exports = QueueCalculations;