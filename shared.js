
function showSuccess(msg) {
  if (window.success) {
    return;
  }
  const notification = document.createElement("div");
  notification.id = "success";

  notification.style.display = "flex";
  notification.style.flexDirection = "column";

  notification.style.padding = "2rem 0";

  const button = document.createElement("button");
  button.innerText = msg || "Success! Click to dismiss.";


  button.addEventListener("click", () => {
    notification.remove();
  });

  notification.appendChild(button);
  document.body.appendChild(notification);

}



const Summary = {
  get: function () {
    return {
      title: this.title.get(),
      description: this.description.get(),
    }
  },
  set: function (summary) {
    if (!summary || typeof summary !== 'object') {
      throw new Error('Invalid summary data object');
    }
    this.title.set(summary.title);
    this.description.set(summary.description);
  },
  title: {
    get: function () {
      return localStorage.getItem("summary.title")?.trim() || ''
    },
    set: function (title) {
      if (typeof title !== 'string') {
        throw new Error('Title must be a string');
      }
      if (title.trim().length === 0) {
        throw new Error('Title cannot be empty');
      }
      if (title.trim().length > 100) {
        throw new Error('Title must be 100 characters or less');
      }
      localStorage.setItem("summary.title", title.trim())
    }
  },
  description: {
    get: function () {
      return localStorage.getItem("summary.description")?.trim() || ''
    },
    set: function (description) {
      if (typeof description !== 'string') {
        throw new Error('Description must be a string');
      }
      if (description.trim().length === 0) {
        throw new Error('Description cannot be empty');
      }
      if (description.trim().length > 500) {
        throw new Error('Description must be 500 characters or less');
      }
      localStorage.setItem("summary.description", description.trim())
    }
  }
}

const Skills = {
  get: function () {
    const skills = [];
    const filtered = Object.entries(localStorage).filter(([key]) =>
      key.startsWith("skill.")
    );

    filtered.forEach(([_, value]) => {
      try {
        const skill = JSON.parse(value);
        skills.push(skill);
      } catch (e) {
        console.error('Failed to parse skill:', e);
      }
    });

    return skills;
  },
  set: function (skills) {
    if (!Array.isArray(skills)) {
      throw new Error('Skills must be an array');
    }

    // Clear existing skills
    const existing = Object.keys(localStorage).filter(key =>
      key.startsWith("skill.")
    );
    existing.forEach(key => localStorage.removeItem(key));

    // Add new skills
    skills.forEach((skill, index) => {
      this.add(skill);
    });
  },
  add: function (skill) {
    if (!skill || typeof skill !== 'object') {
      throw new Error('Invalid skill object');
    }
    if (typeof skill.name !== 'string' || skill.name.trim().length === 0) {
      throw new Error('Skill name is required');
    }
    if (typeof skill.level !== 'string' || skill.level.trim().length === 0) {
      throw new Error('Skill level is required');
    }
    if (!['beginner', 'intermediate', 'advanced', 'expert'].includes(skill.level.toLowerCase())) {
      throw new Error('Invalid skill level. Must be one of: beginner, intermediate, advanced, expert');
    }

    const timestamp = new Date().getTime();
    const key = `skill.${timestamp}`;

    const skillData = {
      name: skill.name.trim(),
      level: skill.level.toLowerCase(),
      timestamp: timestamp
    };

    localStorage.setItem(key, JSON.stringify(skillData));
    return skillData;
  },
  remove: function (timestamp) {
    const key = `skill.${timestamp}`;
    if (localStorage.getItem(key)) {
      localStorage.removeItem(key);
      return true;
    }
    return false;
  },
  clear: function () {
    const keys = Object.keys(localStorage).filter(key =>
      key.startsWith("skill.")
    );
    keys.forEach(key => localStorage.removeItem(key));
  }
}

const Work = {
    get: function () {
        const experiences = [];
        const filtered = Object.entries(localStorage).filter(([key]) => 
            key.startsWith("work.")
        );
        
        filtered.forEach(([_, value]) => {
            try {
                const experience = JSON.parse(value);
                experiences.push(experience);
            } catch (e) {
                console.error('Failed to parse work experience:', e);
            }
        });
        
        // Sort by start date in descending order (most recent first)
        return experiences.sort((a, b) => new Date(b.startDate) - new Date(a.startDate));
    },
    set: function (experiences) {
        if (!Array.isArray(experiences)) {
            throw new Error('Work experiences must be an array');
        }

        // Clear existing experiences
        const existing = Object.keys(localStorage).filter(key => 
            key.startsWith("work.")
        );
        existing.forEach(key => localStorage.removeItem(key));

        // Add new experiences
        experiences.forEach((experience) => {
            this.add(experience);
        });
    },
    add: function (experience) {
        if (!experience || typeof experience !== 'object') {
            throw new Error('Invalid work experience object');
        }

        // Validate required fields
        const required = ['company', 'position', 'startDate', 'location'];
        required.forEach(field => {
            if (!experience[field] || typeof experience[field] !== 'string' || experience[field].trim().length === 0) {
                throw new Error(`${field} is required and must be a non-empty string`);
            }
        });

        // Validate dates
        const startDate = new Date(experience.startDate);
        if (isNaN(startDate.getTime())) {
            throw new Error('Invalid start date');
        }

        if (experience.endDate) {
            const endDate = new Date(experience.endDate);
            if (isNaN(endDate.getTime())) {
                throw new Error('Invalid end date');
            }
            if (endDate < startDate) {
                throw new Error('End date cannot be before start date');
            }
        }

        // Validate highlights
        if (experience.highlights) {
            if (!Array.isArray(experience.highlights)) {
                throw new Error('Highlights must be an array');
            }
            experience.highlights.forEach(highlight => {
                if (typeof highlight !== 'string' || highlight.trim().length === 0) {
                    throw new Error('Each highlight must be a non-empty string');
                }
            });
        }

        const timestamp = new Date().getTime();
        const key = `work.${timestamp}`;
        
        const workData = {
            company: experience.company.trim(),
            position: experience.position.trim(),
            location: experience.location.trim(),
            startDate: experience.startDate,
            endDate: experience.endDate || null,
            current: !!experience.current,
            highlights: (experience.highlights || []).map(h => h.trim()),
            timestamp: timestamp
        };

        localStorage.setItem(key, JSON.stringify(workData));
        return workData;
    },
    remove: function (timestamp) {
        const key = `work.${timestamp}`;
        if (localStorage.getItem(key)) {
            localStorage.removeItem(key);
            return true;
        }
        return false;
    },
    clear: function () {
        const keys = Object.keys(localStorage).filter(key => 
            key.startsWith("work.")
        );
        keys.forEach(key => localStorage.removeItem(key));
    }
}

