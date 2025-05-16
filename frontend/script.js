const apiBase = {
  user: 'http://user.dev.local/api/users',
  transaction: 'http://transaction.dev.local/api/transactions',
  reporting: 'http://reporting.dev.local/api/reporting'
};

let currentUserId = null;

async function register() {
  const username = document.getElementById('reg-name').value;
  const email = document.getElementById('reg-email').value;
  const password = document.getElementById('reg-password').value;
  const bodyData = JSON.stringify({ username, email, password })
  console.log(bodyData)
  const response = await fetch(`${apiBase.user}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: bodyData
  });
  const responseJson = response.json();
  currentUserId = responseJson.data.id;
  alert('Registered. Now log in.');
}

async function login() {
  const email = document.getElementById('login-email').value;
  const password = document.getElementById('login-password').value;
  const res = await fetch(`${apiBase.user}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  console.log("RES: " + `${res}`);
  
  const data = await res.json();
  console.log("DATA: " + `${data}`);
  
  currentUserId = data.data.id;
  localStorage.setItem('userId', currentUserId);
  window.location.href = 'dashboard.html';
}

async function sendMoney() {
  const to_id = document.getElementById('receiver').value;
  const transferAmount = document.getElementById('amount').value;
  const amount = parseFloat(transferAmount);
  console.log(localStorage.getItem('userId'));
  
  const bodyData = JSON.stringify({ to_id, from_id: localStorage.getItem('userId'), amount })
  await fetch(`${apiBase.transaction}/send-money`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: bodyData
  });
  alert('Money sent');
}

async function getTransactions() {
  const userId = localStorage.getItem('userId');
  const res = await fetch(`${apiBase.transaction}/user/${userId}`);
  const json = await res.json();

  const transactions = json.data; // extract actual array
  const list = document.getElementById('transactions');
  list.innerHTML = '';

  transactions.forEach(tx => {
    const li = document.createElement('li');
    li.textContent = `From: ${tx.senderId}, To: ${tx.receiverId}, Amount: ${tx.amount}`;
    list.appendChild(li);
  });
}

async function getSummary() {
  const userId = localStorage.getItem('userId');
  const res = await fetch(`${apiBase.reporting}/generate-transaction-summary/${userId}`);
  const json = await res.json(); // don't forget await here
  const summary = json.data;

  const summaryDiv = document.getElementById('summary');
  summaryDiv.innerHTML = `
    <h3>Transaction Summary</h3>
    <ul>
      <li><strong>User ID:</strong> ${summary.userId}</li>
      <li><strong>Total Sent Transactions:</strong> ${summary.totalFromTransactions}</li>
      <li><strong>Total Received Transactions:</strong> ${summary.totalToTransactions}</li>
      <li><strong>Total Sent Amount:</strong> ${summary.totalFromAmount}</li>
      <li><strong>Total Received Amount:</strong> ${summary.totalToAmount}</li>
      <li><strongAverage Sent Amount:</strong> ${summary.averageFromAmount}</li>
      <li><strongAverage Received Amount:</strong> ${summary.averageToAmount}</li>
      <li><strong>Total Transactions:</strong> ${summary.totalTransactions}</li>
      <li><strong>Total Amount:</strong> ${summary.totalAmount}</li>
      <li><strong>Average Transaction Amount:</strong> ${summary.averageAmount}</li>
    </ul>
  `;
}



