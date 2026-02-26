function fakeApi(name, ms, shouldFail = false) {
  // TODO: return a Promise that:
  // - waits ms milliseconds
  // - then:
  //   - if shouldFail is true -> rejects with an Error
  //   - else -> resolves with a string like `${name} data`
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      shouldFail
        ? reject(new Error(`${name} failed`))
        : resolve(`${name} data`);
    }, ms);
  });
}

async function loadSequential() {
  console.log("Sequential start");
  const user = await fakeApi("user", 500);
  const noti = await fakeApi("notification", 300);
  const message = await fakeApi("message", 200);
  console.log(user);
  console.log(noti);
  console.log(message);
  console.log("Sequential done");
  // TODO:
  // 1. await fakeApi("user", 500)
  // 2. then await fakeApi("notifications", 300)
  // 3. then await fakeApi("messages", 200)
  // 4. log each result
  // 5. finally log "Sequential done"
}
async function loadParallel() {
  console.log("Parallel start");
  const user = fakeApi("user", 500);
  const noti = fakeApi("notification", 300);
  const message = fakeApi("message", 200);
  const all = await Promise.all([user, noti, message]);
  console.log(all);
  console.log("Parallel done");
}

// test calls (keep these)
loadSequential().then(() => {
  return loadParallel();
});
async function loadParralelSafe() {
  console.log("Parallel start");
  const user = fakeApi("user", 500);
  const noti = fakeApi("notification", 300, true);
  const message = fakeApi("message", 200);
  try {
    const [userData, notiData, messData] = Promise.all([user, noti, mess]);
    console.log("User", userData);
    console.log("Notification", notiData);
    console.log("Message", messData);
  } catch (err) {
    console.error("Dashboard fail", err.message);
  }
  console.log("Parallel with error done");
}
