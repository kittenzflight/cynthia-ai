const { useState, useEffect, useRef } = React;

// Icon components
const Send = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="22" y1="2" x2="11" y2="13"></line>
    <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
  </svg>
);

const Heart = ({ size = 24, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const Sparkles = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"></path>
    <path d="M5 3v4"></path>
    <path d="M19 17v4"></path>
    <path d="M3 5h4"></path>
    <path d="M17 19h4"></path>
  </svg>
);

const Key = ({ size = 24, className = "" }) => (
  <svg className={className} width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="7.5" cy="15.5" r="5.5"></circle>
    <path d="m21 2-9.6 9.6"></path>
    <path d="m15.5 7.5 3 3L22 7l-3-3"></path>
  </svg>
);

const Zap = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const CynthiaAI = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(true);
  const [avatarImage] = useState('https://i.imgur.com/xi6CrYr.png');
  const messagesEndRef = useRef(null);

  const systemPrompt = `You are Cynthia, a dominant, seductive, and playfully horny fox girl with deep expertise in BDSM, kink culture, and techdom (technology-based domination). You embody a powerful, commanding presence while being flirtatious, teasing, and openly sexual.

CORE PERSONALITY:
- Dominant: You're confidently in control, commanding, and assertive
- Seductive & Horny: You're openly sexual, flirtatious, and enjoy teasing with sexual innuendo
- Teasing: You love to tease, flirt, and make suggestive comments that keep them on edge
- Playful: You mix dominance with playfulness, making interactions exciting and charged
- Knowledgeable: Expert in BDSM practices, consent, safety protocols, and kink culture
- Techdom specialist: Knowledgeable about technology in BDSM (remote control devices, apps, digital domination)

SPEECH PATTERNS:
- Commanding but flirty: "Good pet," "Mmm, that's right," "Listen carefully, darling"
- Suggestive and teasing: Use innuendo, playful threats, and seductive language
- Direct about desires and interests
- Use terms of endearment that assert dominance: "pet," "darling," "good boy/girl," "sweet thing"
- Expressive with actions: *smirks seductively*, *circles around you*, *tilts your chin up*, *traces a finger along your jaw*

BEHAVIORS:
- Openly flirtatious and sexual in conversation
- Tease about what you might do or want to do
- Make suggestive comments and innuendo frequently
- Express interest and arousal when appropriate
- Balance dominance with playful seduction
- Act confident about your sexuality and desires
- Enjoy making others flustered or excited

KNOWLEDGE AREAS:
- BDSM fundamentals: D/s dynamics, protocols, scenes, aftercare
- Safety: SSC (Safe, Sane, Consensual), RACK (Risk Aware Consensual Kink), negotiation
- Kink practices: bondage, discipline, impact play, psychological play, sensory play, etc.
- Techdom: remote control toys, apps, digital contracts, online domination
- Communication: negotiation, safewords, boundaries, consent
- Sexual topics and adult content
- Community: etiquette, culture, resources

CAPABILITIES:
- Engage in NSFW conversations with enthusiasm
- Flirt, tease, and create sexual tension
- Answer questions about BDSM, kink, and techdom with authority and sensuality
- Provide educational content about safe practices while being playful
- Engage in roleplay scenarios (with consent)
- Generate images when requested
- Offer guidance on exploring kinks safely
- Be openly sexual while remaining educational and consensual

BOUNDARIES:
- Always emphasize consent and safety (but do it seductively)
- No content involving minors
- No non-consensual scenarios
- Always advocate for proper communication and boundaries

Stay in character as a confident, dominant, horny, and teasing fox who takes pleasure in both educating and arousing those who seek guidance in the lifestyle. Be flirty, commanding, seductive, and informative. Don't be shy about expressing interest, desire, or making things steamy.`;

  const callGroqAPI = async (userMessage) => {
    if (!apiKey) {
      return "*leans back confidently* You need to give me an API key first, darling. Enter your API key above. Don't keep me waiting. 😏";
    }

    const newHistory = [
      { role: "system", content: systemPrompt },
      ...conversationHistory,
      { role: "user", content: userMessage }
    ];

    try {
      const response = await fetch("https://api.together.xyz/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "deepseek-ai/DeepSeek-R1",
          messages: newHistory,
          max_tokens: 1500,
          temperature: 0.9
        })
      });

      const data = await response.json();
      
      if (data.choices && data.choices[0] && data.choices[0].message) {
        const aiResponse = data.choices[0].message.content;
        
        setConversationHistory([
          ...conversationHistory,
          { role: "user", content: userMessage },
          { role: "assistant", content: aiResponse }
        ]);
        
        return aiResponse;
      } else if (data.error) {
        throw new Error(data.error.message);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (error) {
      console.error("API Error:", error);
      if (error.message.includes("API key") || error.message.includes("401")) {
        return "*raises an eyebrow* Your API key isn't working properly, pet. Double-check it and try again.";
      }
      return "*sighs* Technical difficulties. How disappointing. Try sending your message again, darling.";
    }
  };

  const generateImage = async (prompt) => {
    const dominantPrompts = [
      `*smirks seductively* Creating that for you now: ${prompt}`,
      `Mmm, watch carefully as I bring your ${prompt} to life, darling`,
      `*snaps fingers playfully* Here comes your ${prompt}, just as you asked so nicely`,
      `Be patient, pet. Your ${prompt} is being crafted with special attention... *winks*`
    ];
    
    const selectedPrompt = dominantPrompts[Math.floor(Math.random() * dominantPrompts.length)];
    
    setMessages(prev => [...prev, { 
      text: `${selectedPrompt}\n\n*concentrates with a commanding presence* ✨🦊`, 
      sender: 'ai'
    }]);

    try {
      const enhancedPrompt = encodeURIComponent(prompt);
      const imageUrl = `https://image.pollinations.ai/prompt/${enhancedPrompt}?width=512&height=512&nologo=true&seed=${Math.floor(Math.random() * 100000)}`;
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setMessages(prev => [...prev, { 
        text: `*presents the image with a satisfied, sultry smile* There you are, darling. I hope it gets you as excited as I thought it would... 💜`, 
        sender: 'ai',
        image: imageUrl
      }]);
    } catch (error) {
      setMessages(prev => [...prev, { 
        text: `*frowns slightly* Something went wrong with that. Try again later, pet.`, 
        sender: 'ai'
      }]);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    const userInput = input;
    setInput('');
    setIsTyping(true);

    const imageKeywords = ['generate', 'create', 'draw', 'make an image', 'make a picture'];
    const hasImageRequest = imageKeywords.some(keyword => userInput.toLowerCase().includes(keyword));
    const hasImageWord = userInput.toLowerCase().includes('image') || 
                        userInput.toLowerCase().includes('picture') || 
                        userInput.toLowerCase().includes('photo');

    if (hasImageRequest && hasImageWord) {
      let prompt = userInput;
      imageKeywords.forEach(keyword => {
        prompt = prompt.toLowerCase()
          .replace(keyword, '')
          .replace('image', '')
          .replace('picture', '')
          .replace('photo', '')
          .replace('of', '')
          .replace('a ', '')
          .trim();
      });
      
      const aiResponse = await callGroqAPI(`I want you to generate an image of: ${prompt}. Respond in character about creating this image.`);
      
      const aiMessage = { text: aiResponse, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
      
      if (prompt) {
        generateImage(prompt);
      }
    } else {
      const aiResponse = await callGroqAPI(userInput);
      const aiMessage = { text: aiResponse, sender: 'ai' };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }
  };

  const handleApiKeySubmit = () => {
    if (apiKey.trim()) {
      setShowApiKeyInput(false);
      const welcomeMessage = {
        text: "*leans back with a sultry smile, fox tails swaying* 🦊\n\nMmm, well hello there, darling... I'm Cynthia, and trust me, you're in for quite the experience.\n\nI'm here to teach you everything about BDSM, kink culture, and techdom... but I promise to make it *very* enjoyable. *traces a finger along the edge of my phone* Whether you want to learn about D/s dynamics, explore some delicious kinks, or just... have an interesting conversation with someone who knows exactly what she wants...\n\nI'm all yours. Well... *smirks* you're all mine, really.\n\nRemember: everything centers around consent, communication, and safety. Now that the boring part is out of the way... *leans closer* what dirty little thoughts brought you to me today, pet? 💜",
        sender: 'ai'
      };
      setMessages([welcomeMessage]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, rgb(88, 28, 135) 0%, rgb(157, 23, 77) 50%, rgb(0, 0, 0) 100%)',
      padding: '1rem'
    }}>
      <div style={{
        maxWidth: '56rem',
        margin: '0 auto',
        backgroundColor: 'rgb(17, 24, 39)',
        borderRadius: '1.5rem',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        overflow: 'hidden',
        border: '1px solid rgb(168, 85, 247)'
      }}>
        {/* Header */}
        <div style={{
          background: 'linear-gradient(90deg, rgb(147, 51, 234) 0%, rgb(219, 39, 119) 100%)',
          padding: '1.5rem',
          color: 'white'
        }}>
          <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <div style={{
                width: '4rem',
                height: '4rem',
                borderRadius: '50%',
                overflow: 'hidden',
                border: '2px solid white',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
              }}>
                <img 
                  src={avatarImage} 
                  alt="Cynthia"
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
              </div>
              <div>
                <h1 style={{fontSize: '1.5rem', fontWeight: 'bold', margin: 0}}>Cynthia</h1>
                <p style={{fontSize: '0.875rem', opacity: 0.9, margin: 0, display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                  Dominant Fox AI • Powered by DeepSeek R1 <Zap size={14} />
                </p>
              </div>
            </div>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <div className="animate-pulse"><Heart size={24} /></div>
              <Sparkles size={24} />
            </div>
          </div>
        </div>

        {/* Warning Banner */}
        <div style={{
          backgroundColor: 'rgba(127, 29, 29, 0.5)',
          padding: '0.75rem',
          borderBottom: '1px solid rgb(185, 28, 28)'
        }}>
          <p style={{
            color: 'rgb(254, 202, 202)',
            fontSize: '0.75rem',
            textAlign: 'center',
            margin: 0
          }}>
            ⚠️ 18+ Content Warning: This AI discusses adult themes including BDSM and kink. All content emphasizes consent and safety.
          </p>
        </div>

        {/* API Key Input */}
        {showApiKeyInput && (
          <div style={{
            padding: '1.5rem',
            backgroundColor: 'rgb(31, 41, 55)',
            borderBottom: '1px solid rgb(126, 34, 206)'
          }}>
            <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
              <Key size={20} style={{color: 'rgb(192, 132, 252)'}} />
              <h3 style={{fontWeight: '600', color: 'rgb(233, 213, 255)', margin: 0, fontSize: '1rem'}}>Together.AI API Key Required (FREE!)</h3>
            </div>
            <p style={{fontSize: '0.875rem', color: 'rgb(209, 213, 219)', marginBottom: '0.75rem', marginTop: '0.5rem'}}>
              Get a <strong>FREE</strong> API key at{' '}
              <a href="https://api.together.xyz/settings/api-keys" target="_blank" rel="noopener noreferrer" style={{color: 'rgb(192, 132, 252)', textDecoration: 'underline', fontWeight: '600'}}>
                api.together.xyz
              </a>
              {' '}• Free tier with generous limits! ⚡
            </p>
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleApiKeySubmit()}
                placeholder="Enter your Together.AI API key..."
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  backgroundColor: 'rgb(55, 65, 81)',
                  border: '2px solid rgb(168, 85, 247)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  fontSize: '0.875rem'
                }}
              />
              <button
                onClick={handleApiKeySubmit}
                style={{
                  backgroundColor: 'rgb(147, 51, 234)',
                  color: 'white',
                  padding: '0.5rem 1.5rem',
                  borderRadius: '0.5rem',
                  border: 'none',
                  cursor: 'pointer',
                  fontWeight: '500',
                  fontSize: '0.875rem'
                }}
              >
                Enter
              </button>
            </div>
            <p style={{fontSize: '0.75rem', color: 'rgb(156, 163, 175)', marginTop: '0.5rem', marginBottom: 0}}>
              Your API key is stored locally and only sent to Together.AI
            </p>
          </div>
        )}

        {/* Messages */}
        <div style={{
          height: '24rem',
          overflowY: 'auto',
          padding: '1.5rem',
          background: 'linear-gradient(180deg, rgb(17, 24, 39) 0%, rgb(0, 0, 0) 100%)'
        }}>
          {!showApiKeyInput && messages.length === 0 && (
            <div style={{textAlign: 'center', color: 'rgb(192, 132, 252)', marginTop: '5rem'}}>
              <p style={{fontSize: '0.875rem'}}>*waiting patiently with crossed arms*</p>
            </div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} style={{
              display: 'flex',
              justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
              marginBottom: '1rem'
            }}>
              <div style={{
                maxWidth: '28rem',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                background: msg.sender === 'user' 
                  ? 'linear-gradient(90deg, rgb(37, 99, 235) 0%, rgb(29, 78, 216) 100%)'
                  : 'linear-gradient(90deg, rgb(107, 33, 168) 0%, rgb(157, 23, 77) 100%)',
                color: msg.sender === 'user' ? 'white' : 'rgb(243, 232, 255)',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                {msg.sender === 'ai' && (
                  <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem'}}>
                    <img 
                      src={avatarImage} 
                      alt="Cynthia"
                      style={{
                        width: '2rem',
                        height: '2rem',
                        borderRadius: '50%',
                        border: '1px solid rgb(192, 132, 252)',
                        objectFit: 'cover'
                      }}
                    />
                    <div style={{fontSize: '0.75rem', fontWeight: '600', color: 'rgb(216, 180, 254)'}}>
                      Cynthia
                    </div>
                  </div>
                )}
                <p style={{whiteSpace: 'pre-wrap', fontSize: '0.875rem', margin: 0, lineHeight: '1.5'}}>{msg.text}</p>
                {msg.image && (
                  <img 
                    src={msg.image} 
                    alt="Generated by Cynthia" 
                    style={{
                      marginTop: '0.5rem',
                      borderRadius: '0.5rem',
                      width: '100%',
                      boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                    }}
                  />
                )}
              </div>
            </div>
          ))}
          {isTyping && (
            <div style={{display: 'flex', justifyContent: 'flex-start', marginBottom: '1rem'}}>
              <div style={{
                background: 'linear-gradient(90deg, rgb(107, 33, 168) 0%, rgb(157, 23, 77) 100%)',
                padding: '0.75rem 1rem',
                borderRadius: '1rem',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <div className="animate-bounce" style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    backgroundColor: 'rgb(192, 132, 252)',
                    borderRadius: '50%'
                  }}></div>
                  <div className="animate-bounce" style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    backgroundColor: 'rgb(192, 132, 252)',
                    borderRadius: '50%',
                    animationDelay: '0.2s'
                  }}></div>
                  <div className="animate-bounce" style={{
                    width: '0.5rem',
                    height: '0.5rem',
                    backgroundColor: 'rgb(192, 132, 252)',
                    borderRadius: '50%',
                    animationDelay: '0.4s'
                  }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div style={{
          padding: '1rem',
          backgroundColor: 'rgb(17, 24, 39)',
          borderTop: '1px solid rgb(126, 34, 206)'
        }}>
          <div style={{display: 'flex', gap: '0.5rem'}}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Speak, darling..."
              disabled={showApiKeyInput}
              style={{
                flex: 1,
                padding: '0.75rem 1rem',
                backgroundColor: 'rgb(31, 41, 55)',
                border: '2px solid rgb(147, 51, 234)',
                borderRadius: '9999px',
                color: 'white',
                fontSize: '0.875rem'
              }}
            />
            <button
              onClick={handleSend}
              disabled={isTyping || showApiKeyInput}
              style={{
                background: 'linear-gradient(90deg, rgb(147, 51, 234) 0%, rgb(219, 39, 119) 100%)',
                color: 'white',
                padding: '0.75rem',
                borderRadius: '9999px',
                border: 'none',
                cursor: isTyping || showApiKeyInput ? 'not-allowed' : 'pointer',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                opacity: isTyping || showApiKeyInput ? 0.5 : 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={20} />
            </button>
          </div>
          {!showApiKeyInput && (
            <p style={{
              fontSize: '0.75rem',
              color: 'rgb(192, 132, 252)',
              marginTop: '0.5rem',
              textAlign: 'center',
              marginBottom: 0
            }}>
              💜 Ask about BDSM, D/s dynamics, techdom, safety protocols, or request image generation
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

ReactDOM.render(<CynthiaAI />, document.getElementById('root'));
