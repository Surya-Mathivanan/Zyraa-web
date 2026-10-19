export default [
  {
    type: "p",
    text: "A knitwear order does not stay inside one building. Fabric goes out to a dyeing unit, panels to a printer, garments to an embroidery job-worker, and someone has to follow them. Merchandisers visit supplier mills to check yarn. Quality staff go to a processing unit to inspect a lot before it comes back. Purchase staff chase trims across town. On any given day, a meaningful part of a unit's staff is working, but not at the face terminal by the gate.",
  },
  {
    type: "p",
    text: "Traditionally that day is marked “OD” in a register on trust, or after a phone call to the supervisor. Trust is fine until it isn't. Without a record, an honest field day and a long personal errand look identical on paper, and the people who genuinely spend their days in other people's factories carry the suspicion that the register creates.",
  },
  {
    type: "p",
    text: "Zyraa treats off-site work as attendance that needs evidence, not permission that needs a signature. The evidence is simple: where you were, a photo taken at that moment, and the time. The point is not surveillance. It is to make an honest field day impossible to confuse with anything else.",
  },
  {
    type: "h2",
    text: "Two different problems: at the branch, and away from it",
  },
  {
    type: "p",
    text: "First, the easier case. Some staff work at a branch that has no terminal near them, or move between buildings. For employees HR enables, the mobile app offers an **office geo punch**: the phone takes a high-accuracy location fix, the server checks it against the branch's allowed radius, and inside the fence the punch is recorded at once. No photo is needed. Outside the radius the punch is refused outright, with no approval route, and the app points the worker to On-Duty instead.",
  },
  {
    type: "p",
    text: "The app deliberately uses a slide-to-punch track instead of a button. A punch is written immediately with no confirm step, so it must not be possible to log attendance with a stray tap while scrolling. The length of the slide is the confirmation.",
  },
  {
    type: "p",
    text: "Off-site work is the harder case, and it gets its own flow: the On-Duty session.",
  },
  {
    type: "h2",
    text: "An on-duty session, step by step",
  },
  {
    type: "steps",
    items: [
      {
        title: "Submit the destination",
        text: "The worker types where they are going and why, for example a supplier mill for a yarn inspection. The session starts as soon as they submit, so a 7 AM train is not held up waiting for an approver.",
      },
      {
        title: "Punch from wherever the work is",
        text: "Up to four punches a day: in, out, in, out. Each one opens the phone's camera for a photo taken at that moment, and records the location fix and its accuracy. The slots can be filled in any order, so one missed punch never blocks the next.",
      },
      {
        title: "Approval runs in the background",
        text: "The request goes to the department head, an optional step by default, and then HR. Until the request is finally approved, the punches are held. On approval they are accepted together; on rejection they are all voided.",
      },
      {
        title: "HR checks each punch",
        text: "Every on-duty punch is verified by HR: the photo, the coordinates and the time. This step goes straight from the employee to HR and cannot be re-routed.",
      },
      {
        title: "The session closes",
        text: "It ends at the fourth punch, when the worker taps Mark as Done, or automatically at the end of the day.",
      },
    ],
  },
  {
    type: "p",
    text: "In the HR portal, sessions move through Awaiting Department Head, Awaiting HR, Active, and Completed or Rejected. An approved on-duty request also generates a gate outpass automatically, so the worker is not stopped at the gate for paperwork the system already has.",
  },
  {
    type: "h2",
    text: "A photo that has to come from the camera",
  },
  {
    type: "p",
    text: "The weakest point of any photo-based check is the gallery. If a worker can attach any picture, they can attach last week's picture. So on-duty punches do not accept uploads. The app opens the camera, the photo is taken there and then, and it travels with the location and time of that punch. HR sees the three together on the Punch Verifications tab and approves or rejects each one.",
  },
  {
    type: "p",
    text: "That does not make fraud impossible, and we do not pretend it does. What it does is raise the effort of faking a punch above the effort of simply being where you said you would be, which is the only bar that matters for most people.",
  },
  {
    type: "h2",
    text: "Simulated locations are flagged, not trusted",
  },
  {
    type: "p",
    text: "Fake-GPS apps are easy to install. Android marks a location that comes from one as mocked, and the Zyraa app sends that flag with every location it reports: office geo punches, on-duty punches and live-tracking pings. The decision is made on the server, not the phone. The server refuses an office geo punch with a mocked location, and on HR's map any employee reporting a mocked location appears as a **red pin** labelled as a simulated location. The guidance to HR is plain: reject that punch and investigate.",
  },
  {
    type: "callout",
    title: "How Zyraa handles it",
    text: "Office geo punches are allowed only for employees HR enables, only inside the branch's radius, and never with a mocked location. Off-site work runs as an On-Duty session with up to four camera-photo and GPS punches, held until the request is approved and each verified by HR. The Geo Attendance pages show a live map (company, employee, on-duty and red simulated-location pins), the route history of on-duty days with direction arrows, and the approvals and punch verifications.",
  },
  {
    type: "h2",
    text: "Tracking with limits",
  },
  {
    type: "p",
    text: "Live location is the feature most likely to be misused by an employer, so it is the most limited. HR turns it on per employee, and the guide tells HR to enable it only for people whose roles involve travel, such as drivers and field visits, not for office staff who stay at the premises. On the phone, sharing runs only while the app is open, never in the background, and stops the moment HR switches it off. It also runs during an active on-duty session, which is when it is actually useful.",
  },
  {
    type: "p",
    text: "What all of this buys is a record that defends the worker as much as the company. On-Duty Records lists every session with its destination, decisions, punches and how it ended. On-Duty Summary by Employee shows sessions, approved days and any mock-GPS flags per person. When someone asks whether a merchandiser really spent Tuesday at the dyeing unit, the answer is four timestamped photos with coordinates, not a supervisor's recollection.",
  },
  {
    type: "p",
    text: "Field work is real work. It deserves attendance that can prove it.",
  },
];
