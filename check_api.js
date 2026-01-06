
const url = 'https://promptixcrm.vercel.app/api/events';

async function checkUrl() {
    try {
        const res = await fetch(url);
        if (res.ok) {
            const data = await res.json();
            console.log(JSON.stringify(data.events[0], null, 2));
        } else {
            console.log('Error:', res.status);
        }
    } catch (err) {
        console.log('Fetch error:', err.message);
    }
}

checkUrl();
