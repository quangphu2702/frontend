# Game Đoán Số - Frontend

Giao diện React cho ứng dụng Game Đoán Số, được xây dựng với Vite và React Router.

## Yêu cầu

- Node.js 16+ và npm/yarn
- Backend Spring Boot đang chạy tại `http://localhost:8080` (hoặc cấu hình URL khác)

## Cài đặt

### 1. Cài đặt dependencies

```bash
cd frontend
npm install
```

### 2. Cấu hình API URL

Tạo file `.env` trong thư mục `frontend`:

```env
VITE_API_URL=http://localhost:8080
```

Hoặc sửa trực tiếp trong `src/config/api.js` nếu cần.

### 3. Chạy ứng dụng

```bash
npm run dev
```

Ứng dụng sẽ chạy tại: `http://localhost:3000`

## Build cho production

```bash
npm run build
```

File build sẽ được tạo trong thư mục `dist/`.

## Deploy lên Vercel

### Cách 1: Deploy qua Vercel CLI

1. Cài đặt Vercel CLI:
```bash
npm i -g vercel
```

2. Đăng nhập:
```bash
vercel login
```

3. Deploy:
```bash
vercel
```

### Cách 2: Deploy qua GitHub

1. Push code lên GitHub repository

2. Vào [Vercel](https://vercel.com) và đăng nhập

3. Click "New Project" và import repository

4. Cấu hình:
   - Framework Preset: Vite
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`

5. Thêm Environment Variable:
   - `VITE_API_URL`: URL của backend (ví dụ: `https://your-backend.vercel.app`)

6. Click "Deploy"

### Cấu hình Vercel cho Backend

Nếu backend cũng deploy trên Vercel hoặc server khác, cần cập nhật file `vercel.json`:

```json
{
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "https://your-backend-url.com/api/:path*"
    }
  ]
}
```

## Cấu trúc Project

```
frontend/
├── src/
│   ├── components/      # Layout, ProtectedRoute
│   ├── config/          # API configuration
│   ├── context/         # AuthContext
│   ├── pages/           # Login, Register, Game, Profile, Leaderboard
│   ├── services/        # API services
│   ├── App.jsx          # Main app component với routing
│   ├── main.jsx         # Entry point
│   └── index.css        # Global styles
├── index.html
├── package.json
├── vite.config.js
└── vercel.json
```

## Tính năng

- ✅ Đăng ký/Đăng nhập với JWT
- ✅ Game đoán số (1-5)
- ✅ Mua lượt chơi
- ✅ Xem thông tin cá nhân
- ✅ Bảng xếp hạng top 10
- ✅ Responsive design
- ✅ Protected routes

## Troubleshooting

### Lỗi kết nối API

- Kiểm tra backend đã chạy chưa
- Kiểm tra CORS configuration trong backend
- Kiểm tra `VITE_API_URL` trong `.env`

### Lỗi khi deploy Vercel

- Kiểm tra build command và output directory
- Kiểm tra environment variables
- Xem logs trong Vercel dashboard

### CORS Error

Cần thêm CORS configuration trong Spring Boot backend:

```java
@Configuration
public class CorsConfig {
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://your-vercel-app.vercel.app"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("*"));
        configuration.setAllowCredentials(true);
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
```
