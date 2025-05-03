
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import Icon from '@/components/ui/icon';
import { useIsMobile } from '@/hooks/use-mobile';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'admin';
  timestamp: Date;
  read: boolean;
  attachments?: { name: string; url: string; type: string }[];
}

interface Chat {
  id: number;
  user: {
    id: number;
    name: string;
    avatar?: string;
    lastSeen: Date;
    online: boolean;
  };
  messages: Message[];
  unreadCount: number;
  lastMessage: Date;
  status: 'active' | 'closed' | 'waiting';
  assignedTo?: {
    id: number;
    name: string;
    avatar?: string;
  };
}

// Примеры сообщений для чатов
const initialChats: Chat[] = [
  {
    id: 1,
    user: {
      id: 101,
      name: 'Анна Иванова',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80',
      lastSeen: new Date(),
      online: true,
    },
    messages: [
      {
        id: 1,
        text: 'Здравствуйте! Подскажите, пожалуйста, как мне записаться на окрашивание?',
        sender: 'user',
        timestamp: new Date(Date.now() - 3600000),
        read: true,
      },
      {
        id: 2,
        text: 'Добрый день! Вы можете записаться через наш сайт, выбрав услугу и удобное для вас время, или позвонить по телефону.',
        sender: 'admin',
        timestamp: new Date(Date.now() - 3500000),
        read: true,
      },
      {
        id: 3,
        text: 'Вы можете посоветовать какого-нибудь конкретного мастера для окрашивания?',
        sender: 'user',
        timestamp: new Date(Date.now() - 3000000),
        read: true,
      },
    ],
    unreadCount: 0,
    lastMessage: new Date(Date.now() - 3000000),
    status: 'active',
    assignedTo: {
      id: 1,
      name: 'Мария Соколова',
      avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
    },
  },
  {
    id: 2,
    user: {
      id: 102,
      name: 'Петр Смирнов',
      lastSeen: new Date(Date.now() - 300000),
      online: false,
    },
    messages: [
      {
        id: 1,
        text: 'Добрый день! У вас есть мужские стрижки?',
        sender: 'user',
        timestamp: new Date(Date.now() - 3 * 3600000),
        read: true,
      },
      {
        id: 2,
        text: 'Здравствуйте! Да, конечно. Мы предлагаем различные варианты мужских стрижек. Какой стиль вас интересует?',
        sender: 'admin',
        timestamp: new Date(Date.now() - 2.9 * 3600000),
        read: true,
      },
      {
        id: 3,
        text: 'Интересует короткая стрижка. Сколько это будет стоить?',
        sender: 'user',
        timestamp: new Date(Date.now() - 1 * 3600000),
        read: false,
      },
    ],
    unreadCount: 1,
    lastMessage: new Date(Date.now() - 1 * 3600000),
    status: 'waiting',
  },
  {
    id: 3,
    user: {
      id: 103,
      name: 'Елена Козлова',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=200&q=80',
      lastSeen: new Date(Date.now() - 1800000),
      online: false,
    },
    messages: [
      {
        id: 1,
        text: 'Хочу записаться на маникюр. Какие есть варианты?',
        sender: 'user',
        timestamp: new Date(Date.now() - 5 * 3600000),
        read: true,
      },
      {
        id: 2,
        text: 'Добрый день! Мы предлагаем классический маникюр, аппаратный, комбинированный, а также различные варианты дизайна. Что бы вы хотели?',
        sender: 'admin',
        timestamp: new Date(Date.now() - 4.9 * 3600000),
        read: true,
      },
      {
        id: 3,
        text: 'Интересует аппаратный маникюр с покрытием гель-лаком.',
        sender: 'user',
        timestamp: new Date(Date.now() - 4.8 * 3600000),
        read: true,
      },
      {
        id: 4,
        text: 'Отлично! У нас как раз есть свободное время в эту пятницу в 15:00. Вам подойдет?',
        sender: 'admin',
        timestamp: new Date(Date.now() - 4.7 * 3600000),
        read: true,
      },
      {
        id: 5,
        text: 'Да, это отлично. Записывайте меня.',
        sender: 'user',
        timestamp: new Date(Date.now() - 4.6 * 3600000),
        read: true,
      },
      {
        id: 6,
        text: 'Я подтвердил вашу запись. Будем ждать вас в пятницу в 15:00!',
        sender: 'admin',
        timestamp: new Date(Date.now() - 4.5 * 3600000),
        read: true,
      },
    ],
    unreadCount: 0,
    lastMessage: new Date(Date.now() - 4.5 * 3600000),
    status: 'closed',
    assignedTo: {
      id: 2,
      name: 'Алексей Петров',
      avatar: 'https://images.unsplash.com/photo-1563833717765-00bdd414c900?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
    },
  },
  {
    id: 4,
    user: {
      id: 104,
      name: 'Михаил Федоров',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
      lastSeen: new Date(),
      online: true,
    },
    messages: [
      {
        id: 1,
        text: 'Здравствуйте! Хотел узнать, есть ли у вас услуга бритья бороды?',
        sender: 'user',
        timestamp: new Date(Date.now() - 30 * 60000),
        read: false,
      },
    ],
    unreadCount: 1,
    lastMessage: new Date(Date.now() - 30 * 60000),
    status: 'waiting',
  },
];

const staffMembers = [
  {
    id: 1,
    name: 'Мария Соколова',
    position: 'Администратор',
    avatar: 'https://images.unsplash.com/photo-1580618672591-eb180b1a973f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 2,
    name: 'Алексей Петров',
    position: 'Старший администратор',
    avatar: 'https://images.unsplash.com/photo-1563833717765-00bdd414c900?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 3,
    name: 'Ольга Смирнова',
    position: 'Консультант',
    avatar: 'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80',
  },
];

const quickReplies = [
  {
    id: 1,
    title: 'Приветствие',
    text: 'Здравствуйте! Благодарим за обращение в чат поддержки салона красоты. Чем я могу вам помочь?',
  },
  {
    id: 2,
    title: 'Запись на услугу',
    text: 'Вы можете записаться на услугу через наш сайт в разделе "Услуги" или позвонить по телефону +7 (999) 123-45-67.',
  },
  {
    id: 3,
    title: 'Цены',
    text: 'Стоимость услуг вы можете посмотреть в разделе "Услуги" на нашем сайте. Окончательная цена может зависеть от длины и густоты волос.',
  },
  {
    id: 4,
    title: 'Время работы',
    text: 'Наш салон работает ежедневно с 9:00 до 21:00 без выходных.',
  },
  {
    id: 5,
    title: 'Подтверждение',
    text: 'Ваша запись подтверждена! Ждем вас в указанное время. Если у вас изменятся планы, пожалуйста, предупредите нас заранее.',
  },
];

const AdminChat: React.FC = () => {
  const [chats, setChats] = useState<Chat[]>(initialChats);
  const [filter, setFilter] = useState<'all' | 'waiting' | 'active' | 'closed'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [attachments, setAttachments] = useState<File[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const [showChatList, setShowChatList] = useState(!isMobile);

  useEffect(() => {
    setShowChatList(!isMobile || !selectedChat);
  }, [isMobile, selectedChat]);

  useEffect(() => {
    if (selectedChat) {
      scrollToBottom();
      
      // Пометить сообщения как прочитанные
      if (selectedChat.unreadCount > 0) {
        setChats(chats.map(chat => 
          chat.id === selectedChat.id 
            ? { 
                ...chat, 
                unreadCount: 0,
                messages: chat.messages.map(msg => 
                  msg.sender === 'user' && !msg.read ? { ...msg, read: true } : msg
                )
              }
            : chat
        ));
        
        setSelectedChat({
          ...selectedChat,
          unreadCount: 0,
          messages: selectedChat.messages.map(msg => 
            msg.sender === 'user' && !msg.read ? { ...msg, read: true } : msg
          )
        });
      }
    }
  }, [selectedChat]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const filteredChats = chats
    .filter(chat => {
      // Фильтр по статусу
      if (filter !== 'all' && chat.status !== filter) {
        return false;
      }
      
      // Поиск по имени пользователя
      if (searchTerm && !chat.user.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => b.lastMessage.getTime() - a.lastMessage.getTime());

  const handleChatSelect = (chat: Chat) => {
    setSelectedChat(chat);
    if (isMobile) {
      setShowChatList(false);
    }
  };

  const handleSendMessage = () => {
    if ((!newMessage.trim() && attachments.length === 0) || !selectedChat) return;
    
    const messageFiles = attachments.map(file => ({
      name: file.name,
      url: URL.createObjectURL(file),
      type: file.type.startsWith('image/') ? 'image' : 'file'
    }));
    
    const newMessageObj: Message = {
      id: Math.max(0, ...selectedChat.messages.map(m => m.id)) + 1,
      text: newMessage,
      sender: 'admin',
      timestamp: new Date(),
      read: false,
      attachments: messageFiles.length > 0 ? messageFiles : undefined
    };
    
    const updatedChat = {
      ...selectedChat,
      messages: [...selectedChat.messages, newMessageObj],
      lastMessage: new Date(),
      status: 'active' as const
    };
    
    setSelectedChat(updatedChat);
    setChats(chats.map(chat => 
      chat.id === selectedChat.id ? updatedChat : chat
    ));
    
    setNewMessage('');
    setAttachments([]);
    
    setTimeout(() => {
      scrollToBottom();
    }, 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const yesterday = new Date(now);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === now.toDateString()) {
      return 'Сегодня';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Вчера';
    } else {
      return date.toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' });
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

  const handleAssignToStaff = (chatId: number, staffId: number) => {
    const staff = staffMembers.find(s => s.id === staffId);
    if (!staff) return;
    
    setChats(chats.map(chat => 
      chat.id === chatId 
        ? { 
            ...chat, 
            assignedTo: {
              id: staff.id,
              name: staff.name,
              avatar: staff.avatar,
            },
            status: 'active' as const
          }
        : chat
    ));
    
    if (selectedChat && selectedChat.id === chatId) {
      setSelectedChat({
        ...selectedChat,
        assignedTo: {
          id: staff.id,
          name: staff.name,
          avatar: staff.avatar,
        },
        status: 'active' as const
      });
    }
  };

  const handleChangeStatus = (chatId: number, status: 'active' | 'closed' | 'waiting') => {
    setChats(chats.map(chat => 
      chat.id === chatId 
        ? { ...chat, status }
        : chat
    ));
    
    if (selectedChat && selectedChat.id === chatId) {
      setSelectedChat({
        ...selectedChat,
        status
      });
    }
  };

  const handleBackToList = () => {
    setShowChatList(true);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500">Активный</Badge>;
      case 'waiting':
        return <Badge className="bg-orange-500">Ожидает</Badge>;
      case 'closed':
        return <Badge className="bg-gray-500">Закрыт</Badge>;
      default:
        return null;
    }
  };

  const insertQuickReply = (text: string) => {
    setNewMessage(text);
  };

  const getTotalUnreadCount = () => {
    return chats.reduce((acc, chat) => acc + chat.unreadCount, 0);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">
          Чат с клиентами 
          {getTotalUnreadCount() > 0 && (
            <Badge className="ml-2 bg-red-500">
              {getTotalUnreadCount()}
            </Badge>
          )}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[350px_1fr] gap-6 h-[calc(100vh-240px)]">
        {showChatList && (
          <Card className="overflow-hidden flex flex-col">
            <CardHeader className="p-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Поиск чатов..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  <TabsList className="hidden">
                    <TabsTrigger value="tab1">Чаты</TabsTrigger>
                  </TabsList>
                </div>
                <Select value={filter} onValueChange={(value: any) => setFilter(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Все чаты" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Все чаты</SelectItem>
                    <SelectItem value="waiting">Ожидающие</SelectItem>
                    <SelectItem value="active">Активные</SelectItem>
                    <SelectItem value="closed">Закрытые</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 overflow-y-auto">
              <div className="divide-y">
                {filteredChats.length > 0 ? (
                  filteredChats.map(chat => (
                    <div
                      key={chat.id}
                      className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                        selectedChat?.id === chat.id ? 'bg-gray-50 border-l-4 border-salon-accent' : ''
                      } ${chat.unreadCount > 0 ? 'bg-blue-50 hover:bg-blue-50' : ''}`}
                      onClick={() => handleChatSelect(chat)}
                    >
                      <div className="flex items-start gap-3">
                        <div className="relative">
                          <Avatar>
                            <AvatarImage src={chat.user.avatar} alt={chat.user.name} />
                            <AvatarFallback>{chat.user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          {chat.user.online && (
                            <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start">
                            <div className="font-medium truncate">{chat.user.name}</div>
                            <div className="text-xs text-gray-500">{formatTime(chat.lastMessage)}</div>
                          </div>
                          <div className="flex items-center gap-1">
                            {getStatusBadge(chat.status)}
                            {chat.assignedTo && (
                              <div className="text-xs text-gray-500 truncate">
                                 • {chat.assignedTo.name}
                              </div>
                            )}
                          </div>
                          <div className="text-sm text-gray-600 truncate mt-1">
                            {chat.messages.length > 0 && (
                              <>
                                {chat.messages[chat.messages.length - 1].sender === 'admin' && 'Вы: '}
                                {chat.messages[chat.messages.length - 1].text}
                              </>
                            )}
                          </div>
                          {chat.unreadCount > 0 && (
                            <div className="mt-1 flex justify-end">
                              <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-red-500 text-white text-xs font-medium">
                                {chat.unreadCount}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500">
                    Чаты не найдены
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {!showChatList && isMobile && (
          <Button variant="outline" className="lg:hidden mb-2" onClick={handleBackToList}>
            <Icon name="ArrowLeft" className="mr-2 h-4 w-4" />
            Назад к списку чатов
          </Button>
        )}

        {selectedChat ? (
          <Card className="overflow-hidden flex flex-col">
            <CardHeader className="py-3 px-4 border-b flex-none">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  {isMobile && (
                    <Button variant="ghost" size="icon" onClick={handleBackToList} className="lg:hidden">
                      <Icon name="ArrowLeft" size={18} />
                    </Button>
                  )}
                  <Avatar>
                    <AvatarImage src={selectedChat.user.avatar} alt={selectedChat.user.name} />
                    <AvatarFallback>{selectedChat.user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-medium flex items-center gap-2">
                      {selectedChat.user.name}
                      {selectedChat.user.online ? (
                        <span className="text-xs text-green-500 flex items-center">
                          <span className="inline-block w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                          Онлайн
                        </span>
                      ) : (
                        <span className="text-xs text-gray-500">
                          Был(а) в сети {formatTime(selectedChat.user.lastSeen)}
                        </span>
                      )}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2">
                      {getStatusBadge(selectedChat.status)}
                      {selectedChat.assignedTo && (
                        <span>• Назначен: {selectedChat.assignedTo.name}</span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Select 
                    value={selectedChat.assignedTo?.id.toString() || ""} 
                    onValueChange={(value) => handleAssignToStaff(selectedChat.id, parseInt(value))}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Назначить..." />
                    </SelectTrigger>
                    <SelectContent>
                      {staffMembers.map(staff => (
                        <SelectItem key={staff.id} value={staff.id.toString()}>
                          {staff.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  
                  <Select 
                    value={selectedChat.status} 
                    onValueChange={(value: any) => handleChangeStatus(selectedChat.id, value)}
                  >
                    <SelectTrigger className="w-[140px]">
                      <SelectValue placeholder="Статус" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Активный</SelectItem>
                      <SelectItem value="waiting">Ожидает</SelectItem>
                      <SelectItem value="closed">Закрыт</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
              {selectedChat.messages.map((message, index) => {
                // Добавим разделитель даты при смене дня
                const showDateSeparator = index === 0 || 
                  new Date(message.timestamp).toDateString() !== 
                  new Date(selectedChat.messages[index - 1].timestamp).toDateString();
                
                return (
                  <React.Fragment key={message.id}>
                    {showDateSeparator && (
                      <div className="text-center my-4">
                        <span className="bg-gray-200 text-gray-600 rounded-full px-3 py-1 text-xs">
                          {formatDate(message.timestamp)}
                        </span>
                      </div>
                    )}
                    <div 
                      className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'} mb-4`}
                    >
                      <div 
                        className={`max-w-[75%] rounded-lg p-3 ${
                          message.sender === 'admin' 
                            ? 'bg-salon-accent text-white rounded-tr-none'
                            : 'bg-white border rounded-tl-none'
                        }`}
                      >
                        <div className="space-y-2">
                          <p className="text-sm">{message.text}</p>
                          
                          {message.attachments && message.attachments.length > 0 && (
                            <div className="space-y-2 mt-2">
                              {message.attachments.map((file, index) => (
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
                                        message.sender === 'admin' ? 'bg-white/20 text-white' : 'bg-gray-100'
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
                          message.sender === 'admin' ? 'text-white/70' : 'text-gray-500'
                        }`}>
                          {formatTime(message.timestamp)}
                          {message.sender === 'admin' && (
                            <span className="ml-1">
                              {message.read ? <Icon name="CheckCheck" size={12} /> : <Icon name="Check" size={12} />}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
              <div ref={messagesEndRef} />
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
            
            <div className="p-4 border-t">
              <Tabs defaultValue="message">
                <TabsList className="mb-3">
                  <TabsTrigger value="message">Сообщение</TabsTrigger>
                  <TabsTrigger value="quick-replies">Быстрые ответы</TabsTrigger>
                </TabsList>
                
                <TabsContent value="message" className="space-y-3">
                  <Textarea
                    placeholder="Введите сообщение..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="min-h-[80px] resize-none"
                  />
                  <div className="flex justify-between">
                    <Button variant="outline" type="button" onClick={handleFileAttachment}>
                      <Icon name="Paperclip" className="mr-2 h-4 w-4" />
                      Прикрепить файл
                    </Button>
                    <Button 
                      className="bg-salon-accent hover:bg-salon-accent/90"
                      onClick={handleSendMessage}
                      disabled={selectedChat.status === 'closed'}
                    >
                      <Icon name="Send" className="mr-2 h-4 w-4" />
                      Отправить
                    </Button>
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                    multiple
                  />
                </TabsContent>
                
                <TabsContent value="quick-replies">
                  <div className="space-y-3">
                    {quickReplies.map(reply => (
                      <div 
                        key={reply.id}
                        className="p-3 rounded border hover:bg-gray-50 cursor-pointer"
                        onClick={() => insertQuickReply(reply.text)}
                      >
                        <div className="font-medium">{reply.title}</div>
                        <div className="text-sm text-gray-600 mt-1 line-clamp-2">{reply.text}</div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </Card>
        ) : (
          <div className="flex items-center justify-center h-full bg-gray-50 rounded-lg border-2 border-dashed">
            <div className="text-center space-y-2 p-6">
              <Icon name="MessageSquare" className="mx-auto h-12 w-12 text-gray-300" />
              <h3 className="text-lg font-medium text-gray-900">Выберите чат</h3>
              <p className="text-gray-500">Выберите чат из списка слева, чтобы начать общение</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminChat;
