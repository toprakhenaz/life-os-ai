# LifeOS - Kişisel Yaşam Yönetim Sistemi

LifeOS, günlük yaşamınızı optimize etmek, alışkanlıklarınızı takip etmek ve kişisel gelişiminizi hızlandırmak için tasarlanmış kapsamlı bir kişisel yaşam yönetim sistemidir. Türkçe arayüzü ile kullanıcı dostu bir deneyim sunar.

![LifeOS Ana Ekran](https://via.placeholder.com/800x400?text=LifeOS+Ana+Ekran)

## İçindekiler

- [Özellikler](#özellikler)
- [Modüller](#modüller)
- [Kurulum](#kurulum)
- [Kullanım](#kullanım)
- [Teknoloji Yığını](#teknoloji-yığını)
- [Veritabanı Yapısı](#veritabanı-yapısı)
- [Geliştirme Yol Haritası](#geliştirme-yol-haritası)
- [Katkıda Bulunma](#katkıda-bulunma)
- [Lisans](#lisans)

## Özellikler

- **Türkçe Arayüz**: Tamamen Türkçe olarak tasarlanmış kullanıcı dostu arayüz
- **Modüler Yapı**: Farklı yaşam alanlarını yönetmek için özelleştirilmiş modüller
- **Veri Görselleştirme**: İlerlemenizi ve alışkanlıklarınızı grafiklerle takip edin
- **Mobil Uyumlu**: Responsive tasarım ile her cihazda sorunsuz çalışır
- **Veritabanı Entegrasyonu**: Supabase ile güvenli veri depolama ve erişim
- **Kişiselleştirilebilir**: Kendi ihtiyaçlarınıza göre uyarlayabilirsiniz

## Modüller

### 1. Aktivite Takibi

- Uyku, beslenme, egzersiz ve üretkenlik aktivitelerini kaydedin
- Günlük, haftalık ve aylık aktivite raporları görüntüleyin
- Aktivite trendlerinizi grafiklerle analiz edin

### 2. Duygusal Durum İzleme

- Ruh halinizi ve enerji seviyenizi günlük olarak kaydedin
- Stres tetikleyicilerini belirleyin ve başa çıkma stratejileri geliştirin
- Duygusal durumunuzdaki değişimleri grafiklerle takip edin

### 3. Zaman Yönetimi

- Görevlerinizi önceliklendirebilir ve planlayabilirsiniz
- Eisenhower Matrisi ile görevlerinizi kategorize edin
- Pomodoro, Time Blocking gibi zaman yönetimi tekniklerini kullanın

### 4. Hedef Takip

- SMART hedefler oluşturun ve ilerlemenizi takip edin
- Alışkanlık oluşturma ve takip etme
- Hedeflerinize ulaşma yolunda görsel ilerleme göstergeleri

### 5. Öğrenme ve Gelişim

- Öğrenme planları oluşturun ve takip edin
- Spaced Repetition (Aralıklı Tekrar) sistemi ile bilgileri kalıcı hale getirin
- Feynman Tekniği ve Deliberate Practice gibi etkili öğrenme yöntemlerini uygulayın

### 6. Sağlık ve Zindelik

- Uyku optimizasyonu ve kronotip analizi
- Beslenme takibi ve önerileri
- Egzersiz planlaması ve takibi

## Kurulum

### Ön Koşullar

- Node.js (v14 veya üzeri)
- npm veya yarn
- Supabase hesabı

### Adımlar

1. Repoyu klonlayın:
   ```bash
   git clone https://github.com/life-os-ai/lifeos.git
   cd lifeos
   ```

2. Bağımlılıkları yükleyin:
   ```bash
   npm install
   # veya
   yarn install
   ```

3. `.env.local` dosyası oluşturun ve Supabase bilgilerinizi ekleyin:
   ```plaintext
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. Supabase veritabanında gerekli tabloları oluşturun:
   - SQL Editor'ü açın ve repo içindeki `database/schema.sql` dosyasındaki komutları çalıştırın

5. Uygulamayı başlatın:
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

6. Tarayıcınızda `http://localhost:3000` adresine gidin

## Kullanım

### İlk Kullanım

1. Ana sayfada bulunan modüllerden birini seçin
2. İlgili modülün formlarını kullanarak verilerinizi girin
3. Verilerinizi analiz etmek için "Analiz" sekmesini kullanın

### Günlük Kullanım Önerileri

- **Sabah**: Duygusal durum kaydı yapın ve günlük hedeflerinizi belirleyin
- **Gün İçinde**: Aktivitelerinizi ve görevlerinizi kaydedin
- **Akşam**: Gün sonu değerlendirmesi yapın ve ertesi günü planlayın
- **Haftalık**: İlerleme analizlerinizi gözden geçirin ve hedeflerinizi güncelleyin

## Teknoloji Yığını

- **Frontend**: Next.js, React, Tailwind CSS
- **Backend**: Next.js API Routes, Server Actions
- **Veritabanı**: Supabase (PostgreSQL)
- **Kimlik Doğrulama**: Supabase Auth
- **Grafik Kütüphaneleri**: Recharts
- **Form Yönetimi**: React Hook Form, Zod

## Veritabanı Yapısı

LifeOS, aşağıdaki veritabanı tablolarını kullanır:

- **activities**: Aktivite kayıtları (uyku, beslenme, egzersiz, üretkenlik)
- **moods**: Duygusal durum kayıtları
- **tasks**: Görev ve zaman yönetimi kayıtları
- **goals**: Hedef ve alışkanlık kayıtları
- **learning**: Öğrenme ve gelişim kayıtları
- **health**: Sağlık ve zindelik kayıtları

Her tablo, kullanıcı bazlı erişim kontrolü için Row Level Security (RLS) politikalarıyla korunmaktadır.

## Geliştirme Yol Haritası

- Kullanıcı kimlik doğrulama sistemi
- Daha fazla veri görselleştirme ve analiz
- Mobil uygulama (React Native)
- Hatırlatıcı ve bildirim sistemi
- Veri dışa aktarma özellikleri
- Yapay zeka destekli öneriler
- Topluluk özellikleri ve paylaşım seçenekleri

## Katkıda Bulunma

Projeye katkıda bulunmak istiyorsanız:

1. Bu repoyu forklayın
2. Yeni bir branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inize push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje [MIT Lisansı](LICENSE) altında lisanslanmıştır.

