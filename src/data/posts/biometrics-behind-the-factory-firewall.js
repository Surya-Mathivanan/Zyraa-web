export default [
  {
    type: "p",
    text: "In every unit I have walked into, the most important piece of HR hardware is bolted to a wall near the gate: a face or fingerprint terminal. Everything in payroll starts there. And almost every one of those terminals sits on the factory's private network, behind a router that, very sensibly, lets nothing in from the internet.",
  },
  {
    type: "p",
    text: "That is a problem the moment your HR software lives in the cloud. The server cannot reach the device. The common workarounds are both bad. Either someone opens a port on the factory firewall so the server can call in, exposing a device protocol that was never designed for the open internet, or someone walks a pen drive from the terminal to a PC every few days and uploads a file. The first is a security hole. The second means attendance is always days behind and depends on one person remembering.",
  },
  {
    type: "p",
    text: "Zyraa was designed for exactly this setup: devices on a factory LAN, a server somewhere else, and an internet line that is not always there. This is how the punches get out, and how you know when they don't.",
  },
  {
    type: "h2",
    text: "Three ways in, usable together",
  },
  {
    type: "list",
    items: [
      "**Pull** - the server connects to the device using the standard ZK protocol on TCP port 4370 and reads its punches. It runs automatically at 7:30 AM and 8:30 PM, India time, plus any custom auto-sync rules, and one failing device never blocks the others.",
      "**Push** - a script or device posts punches to Zyraa's punch endpoint as JSON.",
      "**ADMS push** - the device itself calls the server over HTTPS and sends punches as they happen. Each device is recognised by its serial number.",
    ],
  },
  {
    type: "p",
    text: "Pull is the simplest when the server and devices share a network, as in an on-premise install. ADMS push is the most immediate for cloud setups, because the device dials out. But neither covers everything: pull can't cross the firewall, and push only works if each device is configured correctly and the line is up.",
  },
  {
    type: "h2",
    text: "The site connector: outbound only",
  },
  {
    type: "p",
    text: "The piece that closes the gap is a **site connector**: a small Windows service installed once on an ordinary PC inside the factory, on the same network as the devices. It reaches the devices from inside, and it talks to Zyraa by calling *out* over HTTPS. Nothing calls in. Nothing has to be opened in the factory's firewall.",
  },
  {
    type: "p",
    text: "Setting one up takes a pairing code. HR adds a connector in Device Control, names it after the site, and gets a one-time code that expires after a day. Enter it on the factory PC and the connector's card turns Online. From then on, each device at that site is marked “connect via” that connector, and everything in Device Control works for it as if the server could see it directly: reading users, adding and editing them, and fetching punches.",
  },
  {
    type: "p",
    text: "By default the connector reads the last two days of punches every 15 minutes. That overlap is deliberate. It is a safety net behind the device's own push, so a punch missed for any reason is picked up on the next pass, and reading the same punch twice changes nothing. If the factory's internet drops, the connector keeps what it has read in a local outbox and sends it when the line returns. The card shows whether it is Online, Offline, switched off or waiting to be paired, when it was last heard from, and how many punches are waiting to be sent.",
  },
  {
    type: "callout",
    title: "How Zyraa handles it",
    text: "Pull, JSON push and ADMS push can run side by side, and a site connector bridges factory LANs the cloud cannot reach, using outbound-only connections and a one-time pairing code. A Biometric Device Status page shows every device as Connected, Disconnected, Error or Disabled, with when it was last heard from and nine diagnostic checks for why one is not connecting. It refreshes itself every 15 seconds.",
  },
  {
    type: "h2",
    text: "Unmatched IDs: attendance that quietly disappears",
  },
  {
    type: "p",
    text: "A terminal knows people by a user ID. In Zyraa that ID must equal the employee code. When a new joiner is enrolled with a typo, or someone is enrolled on one device but not another, the terminal records their face perfectly and the punches match nobody. In a spreadsheet world, that worker is simply absent, and nobody finds out until they see their slip.",
  },
  {
    type: "p",
    text: "Zyraa surfaces these. The Unmatched Device IDs report lists biometric IDs that punch but match no employee, with the device, so HR can see attendance that is being discarded while there is still time to fix it. Device Control's Data Push tab goes further, comparing every device with the employee master: people *Not in the HRMS*, people *Not on a device*, people *Inactive, still on one*, and people *On several devices* whose details differ. Faces themselves are enrolled at the machine; Zyraa manages who is on which device.",
  },
  {
    type: "h2",
    text: "Double taps and noisy days",
  },
  {
    type: "p",
    text: "People tap twice. They are not sure the first one registered, or the queue behind them is pushing. If every tap counted, a staff member's lunch-out would land at 09:01 and the whole day would be misjudged. So two taps within five minutes count as one punch.",
  },
  {
    type: "p",
    text: "Some days are messier than a double tap. When HR fetches punches by hand, the result flags any day with six or more punches for one person, and the Punch Exceptions report lists single or odd punches, missing out-punches, six-plus-punch days and double taps. These are the days most likely to produce a wrong verdict, so they are the days a coordinator looks at first.",
  },
  {
    type: "h2",
    text: "Full memories, drifting clocks and quiet devices",
  },
  {
    type: "p",
    text: "Terminals have finite memory for users and for attendance logs, and nobody checks it until the device stops recording. Device Control shows how full each device is and turns amber at 80%, long before it becomes a lost morning. It also shows each device's clock against the server's, because a terminal that has drifted ten minutes will quietly make on-time people late.",
  },
  {
    type: "p",
    text: "When a device has been offline, the Data Fetch tab lets HR pick devices and dates and press Preview to see how many punches the system does not have yet, without changing anything. Then Fetch and update adds them. Punches already in the system are never changed or deleted by a fetch.",
  },
  {
    type: "p",
    text: "And because “no punch means no attendance”, the first thing a coordinator checks each morning is whether every device is talking. The dashboard shows biometric sync status; the Biometric Device Sync Health report lists each device as live, silent or never heard from, with its last push and pull and punch volume. A device that went quiet at 2 AM should be a morning task, not a month-end dispute.",
  },
  {
    type: "p",
    text: "None of this is glamorous. But the face terminal at the gate is where payroll begins, and a payroll system that can't see it reliably is guessing.",
  },
];
