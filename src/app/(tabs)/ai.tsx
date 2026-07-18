import { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cn } from '@/lib/cn';
import { chatThread, quickPrompts, type ChatMessage } from '@/lib/mock';
import { colors } from '@/theme/tokens';

const toneColor: Record<string, string> = {
  default: colors.ink.DEFAULT,
  good: colors.income,
  warn: colors.cat.amber,
  bad: colors.expense,
  brand: colors.brand.DEFAULT,
};

export default function AiChat() {
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<ChatMessage[]>(chatThread);
  const [draft, setDraft] = useState('');

  const send = (text: string) => {
    const t = text.trim();
    if (!t) return;
    setMessages((m) => [...m, { id: `u${m.length}`, role: 'user', kind: 'text', text: t }]);
    setDraft('');
  };

  return (
    <View className="flex-1 bg-surface" style={{ paddingTop: insets.top }}>
      {/* Header */}
      <View className="flex-row items-center gap-3 border-b border-hairline px-5 pb-3 pt-1">
        <View className="h-10 w-10 items-center justify-center rounded-xl bg-brand">
          <MaterialCommunityIcons name="robot-happy" size={22} color="#fff" />
        </View>
        <View>
          <Text className="text-lg font-bold text-royal">Budget Bot</Text>
          <View className="flex-row items-center gap-1.5">
            <View className="h-2 w-2 rounded-full bg-income" />
            <Text className="text-xs font-medium text-income">Online</Text>
            <Text className="text-xs text-ink-faint">• powered by AI</Text>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView className="flex-1" contentContainerClassName="px-5 py-4 gap-3" showsVerticalScrollIndicator={false}>
          {/* Quick prompts */}
          <Text className="mb-1 text-xs font-semibold uppercase tracking-wide text-ink-faint">Quick Prompts</Text>
          {quickPrompts.map((q) => (
            <Pressable
              key={q}
              onPress={() => send(q)}
              className="rounded-xl border border-hairline bg-surface px-4 py-3">
              <Text className="text-[15px] text-ink-soft">{q}</Text>
            </Pressable>
          ))}

          <View className="h-1" />

          {messages.map((m) => (
            <Bubble key={m.id} message={m} />
          ))}
        </ScrollView>

        {/* Input bar */}
        <View className="flex-row items-center gap-2 border-t border-hairline px-4 pt-3" style={{ paddingBottom: 8 }}>
          <TextInput
            value={draft}
            onChangeText={setDraft}
            placeholder="Ask about your finances"
            placeholderTextColor={colors.ink.faint}
            className="flex-1 rounded-full bg-track px-4 py-3 text-[15px] text-ink"
            onSubmitEditing={() => send(draft)}
            returnKeyType="send"
          />
          <Pressable onPress={() => send(draft)} className="h-11 w-11 items-center justify-center rounded-full bg-brand">
            <MaterialCommunityIcons name="send" size={20} color="#fff" />
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

function Bubble({ message }: { message: ChatMessage }) {
  if (message.kind === 'analysis') {
    return (
      <View className="max-w-[88%] self-start rounded-2xl rounded-tl-sm bg-track p-4">
        <Text className="mb-2 text-[15px] font-bold text-ink">{message.title}</Text>
        <View className="gap-1.5">
          {message.rows.map((r) => (
            <View key={r.label} className="flex-row justify-between">
              <Text className="text-[13px] text-ink-muted">{r.label}</Text>
              <Text className="text-[13px] font-semibold" style={{ color: toneColor[r.tone] }}>
                {r.value}
              </Text>
            </View>
          ))}
        </View>
        <Text className="mt-3 text-[13px] leading-5 text-ink-soft">{message.note}</Text>
      </View>
    );
  }

  const isUser = message.role === 'user';
  return (
    <View
      className={cn(
        'max-w-[80%] rounded-2xl px-4 py-3',
        isUser ? 'self-end rounded-tr-sm bg-brand' : 'self-start rounded-tl-sm bg-track',
      )}>
      <Text className={cn('text-[15px] leading-5', isUser ? 'text-white' : 'text-ink')}>{message.text}</Text>
    </View>
  );
}
