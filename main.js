// The holidays are coming up. Some people like to do gift exchanges.
// Some people don't. We don't judge.

// Assign everyone in your family to someone. Don't leave anyone out you filthy animal.
// Results must be random. Each person is assigned to just one other person.
// Do not assign to yourself.

const mailer = require('./mailer');

const members = [
  'User_1',
  'User_2',
  'User_3',
  'User_4',
  'User_5'
];

const emails = [
  { name: 'User_1', email: 'email1@gmail.com'   },
  { name: 'User_2', email: 'email2@me.com'      },
  { name: 'User_3', email: 'email3@gmail.com'   },
  { name: 'User_4', email: 'email4@hotmail.com' },
  { name: 'User_5', email: 'email5@gmail.com'   }
];

let assignedIdxs = [];

function assignMembers() {
  for (let idx of members.keys()) {
    let assignedIdx

    while (assignedIdxs.length < members.length) {
      assignedIdx = Math.floor(Math.random() * members.length) + 0;

      if (
        assignedIdx !== idx &&
        !assignedIdxs.includes(assignedIdx)
      ) {
        assignedIdxs.push(assignedIdx);

        break;
      }

      // exception for unassigned last member
      // do not assign self or have already been assigned
      if (
        idx === members.length - 1 &&
        !assignedIdxs.includes(idx) &&
        assignedIdx !== idx
      ) {
        const reAssignIdx = Math.floor(Math.random() * (members.length - 1)) + 0;

        // swap in last member with reassignee
        if (assignedIdxs[reAssignIdx] !== idx) {
          assignedIdxs[idx] = assignedIdxs[reAssignIdx];
          assignedIdxs[reAssignIdx] = idx;

          break;
        }
      }
    }
  };

  assignedIdxs.forEach((assigneeIdx, idx) => {
    console.log(`${members[idx]} is assigned ${members[assigneeIdx]}.`);

    const to = emails.find(entry => entry.name === members[idx]).email;
    const message = `${members[idx]} is assigned ${members[assigneeIdx]}.`;

    try {
      mailer.sendEmail(to, message);
    } catch (err) {
      console.log('send email error:', err.message);
    }
  });
}

assignMembers();

// Example Output:
// Robert is assigned Anne.
// Anne is assigned James.
// James is assigned Ken.
// Dennis is assigned Robert.
// Ken is assigned Dennis.
