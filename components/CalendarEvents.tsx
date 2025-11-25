"use client";

export default function CalendarEvents() {
  const events = [
    {
      date: "Nov 25",
      day: "Tuesday",
      time: "16:00 WAT",
      title: "Kickoff (25 Nov 2025)",
      organizer: "Project Genius Hub Zaria",
      location: "Virtual"
    },
    {
      date: "Nov 29",
      day: "Saturday",
      time: "10:00 WAT",
      title: "Fast Prototyping with AI (29 Nov 2025)",
      organizer: "Project Genius Hub Zaria",
      location: "Workshop"
    },
    {
      date: "Dec 9",
      day: "Tuesday",
      time: "",
      title: "The Refinery — Midway Stakeholder Review (09 Dec 2025)",
      organizer: "Project Genius Hub Zaria",
      location: "Hybrid"
    },
    {
      date: "TBA",
      day: "",
      time: "",
      title: "Grand Finale (Final Hub Day)",
      organizer: "Project Genius Hub Zaria",
      location: "Physical"
    }
  ];

  return (
    <div style={{
      border: '1px solid #bfcbda88',
      borderRadius: '4px',
      padding: '20px',
      minHeight: '500px',
      backgroundColor: 'var(--nextra-bg)'
    }}>
      {events.map((event, index) => (
        <div key={index} style={{ marginBottom: index < events.length - 1 ? '30px' : '0' }}>
          <div style={{ marginBottom: '8px' }}>
            <span style={{ fontWeight: 'bold', color: '#9ca3af', fontSize: '14px' }}>{event.date}</span>
            {event.day && (
              <>
                <br />
                <span style={{ color: '#9ca3af', fontSize: '14px' }}>{event.day}</span>
              </>
            )}
          </div>
          {event.time && (
            <div style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '8px' }}>
              {event.time}
            </div>
          )}
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#ffffff', marginBottom: '8px' }}>
            {event.title}
          </div>
          <div style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '4px' }}>
            By {event.organizer}
          </div>
          <div style={{ color: '#9ca3af', fontSize: '14px' }}>
            {event.location}
          </div>
          {index < events.length - 1 && (
            <hr style={{ borderColor: '#bfcbda88', marginTop: '20px', marginBottom: '20px' }} />
          )}
        </div>
      ))}
    </div>
  );
}

