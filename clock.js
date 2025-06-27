
        const dateElement = document.getElementById('date');
        const now = new Date();
        const year = now.getFullYear();
        const monthName = [
          'January', 'February', 'March', 'April', 'May', 'June',
          'July', 'August', 'September', 'October', 'November', 'December'
        ][now.getMonth()];
        const dayOfMonth = now.getDate();
        const day = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][now.getDay()];
        const hour = now.getHours();
        const minute = now.getMinutes();
        const period = hour < 12 ? 'AM' : 'PM';
        const hour12 = hour % 12 || 12;
        dateElement.textContent = `${year} ${monthName} ${dayOfMonth}, ${day} ${hour12}:${minute.toString().padStart(2, '0')} ${period}`;