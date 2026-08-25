
  // ------------------------
  // RULES
  // ------------------------
  const DEFAULT_RULES = [
    {
      id: 'help',
      description: 'Slash command: /help',
      triggers: { keywords: ['/help'], regex: [] },
      response: `Here are some things you can ask me:\n• pricing — see our plans\n• hours — support hours\n• refund — refund policy\n• human — talk to a person\n• reset — clear context`,
      suggestions: ['pricing', 'hours', 'refund', 'human']
    },
    {
      id: 'greeting',
      description: 'Simple greeting',
      triggers: { keywords: ['hello', 'hi', 'hey', 'namaste'], regex: [] },
      response: 'Hey! I\'m your helper bot. Ask about pricing, refunds, support hours, or type /help.',
      suggestions: ['pricing', 'hours', 'refund']
    },
    {
      id: 'pricing',
      description: 'Pricing information',
      triggers: { keywords: ['price', 'pricing', 'cost', 'charges', 'plan'], regex: [] },
      response: 'Plans: 1 - Page Website - ₹7500 • Multiple page website(3 pages) ₹12,500 • Multiple page (5 pages) website ₹15000',
      contextUpdates: { lastTopic: 'pricing' },
      suggestions: ['What\'s included?']
    },
    {
      id: 'services',
      description: 'Pricing information',
      triggers: { keywords: ['services', 'pricing', 'cost', 'charges', 'plan'], regex: [] },
      response: 'I create awesome personal portfolio websites & websites for small businesses. I can also help with maintenance and updation of your existing website',
      contextUpdates: { lastTopic: 'pricing' },
      suggestions: ['pricing']
    },
    {
      id: 'hours',
      description: 'Support hours',
      triggers: { keywords: ['hours', 'timing', 'support time', 'when open'], regex: [] },
      response: 'Support hours: Mon–Sat, 10:00–18:00 IST. Average response time: under 2 hours.',
      contextUpdates: { lastTopic: 'hours' },
      suggestions: ['Talk to human', 'Pricing', 'Refund']
    },
    {
      id: 'refund',
      description: 'Refund policy',
      triggers: { keywords: ['refund', 'return', 'money back'], regex: [] },
      response: 'Refunds: 14-day no-questions-asked refund on first purchase. After that, pro-rated refunds apply.',
      contextUpdates: { lastTopic: 'refund' },
      suggestions: ['How to request refund?', 'Talk to human']
    },
    {
      id: 'contact-human',
      description: 'Handoff to human',
      triggers: { keywords: ['human', 'agent', 'representative', 'support person'], regex: [] },
      response: 'Sure — I\'ve queued this for a human agent. Share your email/WhatsApp so we can reach you soon.',
      contextUpdates: { needsHandoff: true },
      suggestions: ['Share email', 'Share WhatsApp']
    },
    {
      id: 'email-capture',
      description: 'Capture email with regex',
      triggers: { keywords: [], regex: ['\\b[\\w.-]+@[\\w.-]+\\.[A-Za-z]{2,6}\\b'] },
      condition: (ctx) => ctx.needsHandoff === true,
      response: (match, ctx) => `Thanks! We'll contact you at <strong>${match[0]}</strong> shortly. Anything else?`,
      contextUpdates: (match) => ({ needsHandoff: false, email: match[0] }),
      suggestions: ['pricing', 'refund', 'No, thanks']
    },
    {
      id: 'contextual-followup',
      description: 'If user asks “what\'s included?” after pricing',
      triggers: { keywords: ['what\'s included', 'features', 'benefits'], regex: [] },
      condition: (ctx) => ctx.lastTopic === 'pricing',
      response: '1 - Page website: Top Navigation to navigate around the page, Upto 5 sections • Multiple page website - Landing page + 3/5 other pages ',
    },
    {
      id: 'reset',
      description: 'Reset context',
      triggers: { keywords: ['reset', 'clear context'], regex: [] },
      response: 'Context cleared. How can I help now?',
      contextUpdates: { lastTopic: null, needsHandoff: false, email: null }
    },
    {
      id: 'fallback',
      description: 'Fallback when nothing matches',
      triggers: { keywords: [], regex: [] },
      response: (text) => `I'm not sure about “${text}”. Try /help or ask about pricing, hours, or refund.`,
      suggestions: ['pricing', 'hours', 'refund', '/help']
    }
  ];

  // ------------------------
  // STATE & ELEMENTS
  // ------------------------
  const state = {
    ctx: { lastTopic: null, needsHandoff: false, email: null },
    rules: [...DEFAULT_RULES],
    history: []
  };

  const els = {
    messages: document.getElementById('messages'),
    chatForm: document.getElementById('chatForm'),
    userInput: document.getElementById('userInput'),
    suggestions: document.getElementById('suggestions'),
    // rulesEditor: document.getElementById('rulesEditor'),
    // applyRules: document.getElementById('applyRules'),
    rulesStatus: document.getElementById('rulesStatus'),
    // stateView: document.getElementById('stateView'),
    // themeBtn: document.getElementById('themeBtn'),
    // clearBtn: document.getElementById('clearBtn'),
    // year: document.getElementById('year'),
  };

//   els.year.textContent = new Date().getFullYear();

  function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = String(str);
    return div.innerHTML;
  }

  function addMessage(role, html, suggestions = []) {
    const wrap = document.createElement('div');
    wrap.className = 'd-flex mb-2 ' + (role === 'user' ? 'justify-content-end' : 'justify-content-start');

    const bubble = document.createElement('div');
    bubble.className = (role === 'user') ? 'bubble-user' : 'bubble-bot';
    bubble.innerHTML = html;

    wrap.appendChild(bubble);
    els.messages.appendChild(wrap);
    els.messages.scrollTop = els.messages.scrollHeight;

    renderSuggestions(suggestions);
  }

  function renderSuggestions(items = []) {
    els.suggestions.innerHTML = '';
    items.forEach(txt => {
      const btn = document.createElement('button');
      btn.className = 'btn btn-outline-secondary btn-sm';
      btn.textContent = txt;
      btn.addEventListener('click', () => sendUserText(txt));
      els.suggestions.appendChild(btn);
    });
  }

//   function updateStateView() {
//     els.stateView.textContent = JSON.stringify(state.ctx, null, 2);
//   }

  function normalize(text) {
    return text.toLowerCase().trim();
  }

  function matchRule(text) {
    const n = normalize(text);

    for (const rule of state.rules) {
      if (typeof rule.condition === 'function' && !rule.condition(state.ctx)) continue;

      if (rule.triggers?.regex?.length) {
        for (const pattern of rule.triggers.regex) {
          try {
            const re = new RegExp(pattern, 'i');
            const match = n.match(re);
            if (match) return { rule, match };
          } catch (e) { console.warn('Invalid regex', rule.id, e); }
        }
      }

      if (rule.triggers?.keywords?.length) {
        for (const kw of rule.triggers.keywords) {
          if (n.includes(kw.toLowerCase())) return { rule, match: null };
        }
      }
    }
    const fallback = state.rules.find(r => r.id === 'fallback');
    return { rule: fallback, match: null };
  }

  function applyContextUpdates(rule, match) {
    if (!rule.contextUpdates) return;
    const updates = (typeof rule.contextUpdates === 'function') ? rule.contextUpdates(match, state.ctx) : rule.contextUpdates;
    Object.assign(state.ctx, updates);
    // updateStateView();
  }

  function respondTo(text) {
    const { rule, match } = matchRule(text);
    let reply = '';
    if (typeof rule.response === 'function') {
      reply = sanitize(rule.response(match || text, state.ctx));
    } else {
      reply = sanitize(rule.response);
    }
    addMessage('bot', reply, rule.suggestions || []);
    applyContextUpdates(rule, match);
    state.history.push({ t: Date.now(), user: text, rule: rule.id });
  }

  function sendUserText(text) {
    if (!text) return;
    addMessage('user', sanitize(text));
    respondTo(text);
  }

  els.chatForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = els.userInput.value;
    els.userInput.value = '';
    sendUserText(text);
  });

//   function loadRulesEditor() {
//     els.rulesEditor.value = JSON.stringify(state.rules, null, 2);
//   }

//   els.applyRules.addEventListener('click', () => {
//     try {
//       const next = JSON.parse(els.rulesEditor.value);
//       if (!Array.isArray(next)) throw new Error('Rules must be array');
//       state.rules = next;
//       els.rulesStatus.textContent = 'Applied ✓';
//       setTimeout(() => (els.rulesStatus.textContent = ''), 1200);
//     } catch (err) {
//       els.rulesStatus.textContent = 'Invalid JSON: ' + err.message;
//     }
//   });

  let dark = false;
//   function setTheme() {
//     document.body.classList.toggle('bg-dark', dark);
//     document.body.classList.toggle('text-white', dark);
//     els.themeBtn.textContent = dark ? 'Dark' : 'Light';
//   }
//   els.themeBtn.addEventListener('click', () => { dark = !dark; setTheme(); });

//   els.clearBtn.addEventListener('click', () => {
//     els.messages.innerHTML = '';
//     renderSuggestions([]);
//     state.ctx = { lastTopic: null, needsHandoff: false, email: null };
//     updateStateView();
//     addMessage('bot', 'Chat cleared. Type /help to see options.');
//   });

  function boot() {
    // setTheme();
    // loadRulesEditor();
    // updateStateView();
    addMessage('bot', 'Hi! I\'m a rule-based bot. Ask me about pricing, Services', ['Services','pricing',]);
  }

  boot();

// chat toggling
    const chatToggle = document.getElementById('chatToggle');
  const chatWidget = document.getElementById('chatWidget');
  const closeChat = document.getElementById('closeChat');

  chatToggle.addEventListener('click', () => {
    chatWidget.classList.remove('invisible');
    chatToggle.classList.add('invisible');
  });

  closeChat.addEventListener('click', () => {
    chatWidget.classList.add('invisible');
    chatToggle.classList.remove('invisible');
  });

  function setChatbotWaMessage(){
    console.log('Setting WhatsApp message link');
    const chatBotUserInput = document.getElementById('chatbotUserInput').value;
    const chatBotWaMessageBtn = document.getElementById('chatbotWaSendBtnd');
    chatBotWaMessageBtn.href = `https://wa.me/7034763747?text=${encodeURIComponent(chatBotUserInput)}`;
  }