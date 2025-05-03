
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import Icon from '@/components/ui/icon';
import { useAuth } from '@/hooks/use-auth';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
}

type MessageType = {
  id: number;
  sender: 'user' | 'staff';
  senderName: string;
  senderAvatar?: string;
  text: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
  files?: { name: string; url: string; type: string }[];
};

const initialMessages: MessageType[] = [
  {
    id: 1,
    sender: 'staff',
    senderName: 'Консультант Мария',
    senderAvatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    text: 'Здравствуйте! Как я могу вам помочь?',
    timestamp: new Date(Date.now() - 3600000),
    status: 'read',
  },
  {
    id: 2,
    sender: 'user',
    senderName: 'Вы',
    text: 'Добрый день! Хотел узнать, какие услуги по окрашиванию волос вы предлагаете?',
    timestamp: new Date(Date.now() - 3500000),
    status: 'read',
  },
  {
    id: 3,
    sender: 'staff',
    senderName: 'Консультант Мария',
    senderAvatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    text: 'У нас есть несколько вариантов окрашивания: однотонное, мелирование, омбре, шатуш. Какой тип вас интересует?',
    timestamp: new Date(Date.now() - 3400000),
    status: 'read',
  },
];

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose }) => {
  const [messages, setMessages] = useState<MessageType[]>(initialMessages);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [attachments, setAttachments] = useState<File[]>([]);
  const { user } = useAuth();

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() || attachments.length > 0) {
      const newId = messages.length ? Math.max(...messages.map(m => m.id)) + 1 : 1;
      
      const files = attachments.map(file => ({
        name: file.name,
        url: URL.createObjectURL(file),
        type: file.type.startsWith('image/') ? 'image' : 'file'
      }));
      
      const userMessage: MessageType = {
        id: newId,
        sender: 'user',
        senderName: user ? user.name : 'Вы',
        text: newMessage,
        timestamp: new Date(),
        status: 'sent',
        files: files.length > 0 ? files : undefined
      };
      
      setMessages([...messages, userMessage]);
      setNewMessage('');
      setAttachments([]);
      
      // Имитация ответа от консультанта
      setTimeout(() => {
        setIsTyping(true);
        
        setTimeout(() => {
          const responseId = newId + 1;
          const staffResponse: MessageType = {
            id: responseId,
            sender: 'staff',
            senderName: 'Консультант Мария',
            senderAvatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
            text: getAutoResponse(newMessage),
            timestamp: new Date(),
            status: 'sent',
          };
          
          setMessages(prev => [...prev, staffResponse]);
          setIsTyping(false);
        }, 2000);
      }, 1000);
    }
  };

  const getAutoResponse = (message: string) => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes('цен') || lowerMessage.includes('стоимость') || lowerMessage.includes('стоит')) {
      return 'Стоимость услуг начинается от 1500₽ за однотонное окрашивание. Точную цену можно узнать на консультации у мастера, так как она зависит от длины, густоты волос и используемых материалов.';
    }
    
    if (lowerMessage.includes('запис') || lowerMessage.includes('записать') || lowerMessage.includes('время')) {
      return 'Вы можете записаться на наш сайт через раздел "Услуги", выбрав удобное время, или по телефону +7 (999) 123-45-67.';
    }
    
    if (lowerMessage.includes('окрашивание') || lowerMessage.includes('цвет') || lowerMessage.includes('краска')) {
      return 'Мы используем профессиональные красители премиум-класса от L\'Oréal, Matrix и Wella. Наши стилисты помогут подобрать оттенок, который идеально подойдет именно вам.';
    }
    
    if (lowerMessage.includes('скидк') || lowerMessage.includes('акци') || lowerMessage.includes('бонус')) {
      return 'У нас действует программа лояльности: скидка 10% на первое посещение, 15% на комплекс услуг и специальные акции для постоянных клиентов. Следите за обновлениями в разделе "Акции"!';
    }
    
    return 'Спасибо за ваш вопрос! Я с радостью помогу вам. Для получения более детальной информации, вы можете позвонить нам или оставить контактный номер, и наш мастер свяжется с вами.';
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileAttachment = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const newFiles = Array.from(e.target.files);
      if (attachments.length + newFiles.length <= 5) {
        setAttachments(prev => [...prev, ...newFiles]);
      } else {
        alert('Вы можете прикрепить максимум 5 файлов');
      }
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(attachments.filter((_, i) => i !== index));
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 w-[350px] sm:w-[400px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col z-50">
      <div className="bg-salon-accent p-4 text-white flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80" alt="Мария" />
            <AvatarFallback>МС</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">Онлайн-консультант</div>
            <div className="text-xs flex items-center">
              <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-1"></span>
              <span>Онлайн</span>
            </div>
          </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-white/20" 
          onClick={onClose}
        >
          <Icon name="X" size={18} />
        </Button>
      </div>
      
      <div className="flex-1 p-4 overflow-y-auto max-h-[350px] bg-gray-50">
        <div className="space-y-4">
          {messages.map((message) => (
            <div 
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[75%] rounded-lg p-3 ${
                  message.sender === 'user' 
                    ? 'bg-salon-accent text-white rounded-tr-none'
                    : 'bg-white border rounded-tl-none'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  {message.sender === 'staff' && (
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={message.senderAvatar} alt={message.senderName} />
                      <AvatarFallback>{message.senderName.charAt(0)}</AvatarFallback>
                    </Avatar>
                  )}
                  <span className="text-xs opacity-75">
                    {message.sender === 'user' ? 'Вы' : message.senderName}
                  </span>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm">{message.text}</p>
                  
                  {message.files && message.files.length > 0 && (
                    <div className="space-y-2 mt-2">
                      {message.files.map((file, index) => (
                        <div key={index} className="flex items-center gap-2">
                          {file.type === 'image' ? (
                            <a 
                              href={file.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="block"
                            >
                              <img 
                                src={file.url} 
                                alt={file.name} 
                                className="max-w-full h-auto max-h-32 rounded"
                              />
                            </a>
                          ) : (
                            <a 
                              href={file.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className={`flex items-center gap-2 text-xs p-2 rounded ${
                                message.sender === 'user' ? 'bg-white/20 text-white' : 'bg-gray-100'
                              }`}
                            >
                              <Icon name="File" size={14} />
                              <span className="truncate max-w-[150px]">{file.name}</span>
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className={`text-right text-xs mt-1 ${
                  message.sender === 'user' ? 'text-white/70' : 'text-gray-500'
                }`}>
                  {formatTime(message.timestamp)}
                  {message.sender === 'user' && (
                    <span className="ml-1">
                      {message.status === 'sent' && <Icon name="Check" size={12} />}
                      {message.status === 'delivered' && <Icon name="CheckCheck" size={12} />}
                      {message.status === 'read' && <Icon name="CheckCheck" size={12} className="text-blue-300" />}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white border rounded-lg rounded-tl-none p-3 max-w-[75%]">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>
      
      {attachments.length > 0 && (
        <div className="p-2 border-t bg-gray-50 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div key={index} className="flex items-center gap-1 bg-white rounded p-1 text-xs border">
              <Icon name={file.type.startsWith('image/') ? 'Image' : 'File'} size={12} />
              <span className="truncate max-w-[100px]">{file.name}</span>
              <button onClick={() => removeAttachment(index)} className="text-red-500 hover:text-red-700">
                <Icon name="X" size={12} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      <div className="border-t p-3">
        <div className="flex">
          <Textarea
            placeholder="Напишите сообщение..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            className="min-h-[60px] resize-none flex-1 rounded-r-none focus-visible:ring-0 border-r-0"
          />
          <div className="flex flex-col border border-l-0 rounded-r-md">
            <button
              onClick={handleFileAttachment}
              className="h-1/2 px-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 border-b"
            >
              <Icon name="Paperclip" size={18} />
            </button>
            <button
              onClick={handleSendMessage}
              className="h-1/2 px-2 text-salon-accent hover:bg-salon-accent/10"
            >
              <Icon name="Send" size={18} />
            </button>
          </div>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            className="hidden"
            multiple
          />
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Время работы консультантов: 9:00-20:00
        </div>
      </div>
    </div>
  );
};

export default ChatWidget;
