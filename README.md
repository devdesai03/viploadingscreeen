# VIP Roleplay Loading Screen

Welcome to the **VIP Roleplay Loading Screen**, a modern and interactive loading screen designed specifically for FiveM servers. This project is built with responsiveness, elegance, and user experience in mind, offering players a high-quality introduction to your server.

---

## 🎨 Features

- **Custom Background Video**: A luxurious video background to captivate players while loading.
- **Dynamic Music Player**:
  - Playlist functionality with play, pause, next, and previous buttons (Space Bar and Arrow Keys work).
  - Volume slider with increments of 5%.
  - Mute/unmute functionality persisting across song changes.
- **Particles Animation**: Beautiful and interactive particles powered by Particles.js.
- **Custom Cursor**: A visually appealing cursor to match the theme.
- **Custom Minigame**: A visually appealing and interactive minigame (Tik-Tak-Toe) to past time. 
- **Responsive Design**:
  - Works seamlessly on desktops and mobile devices.
  - Scales elegantly for different screen sizes.
- **Social Media Links**: Quick access to Discord and Tebex for donations.

---

## 🚀 How to Use

### Prerequisites
- A web server or FiveM server to serve the files.
- Basic knowledge of hosting a web-based interface.
- Create a catbox of your choice of music videos and song covers (saves space). 

### Installation Steps
1. Clone the repository to your server:
   ```bash
   git clone https://github.com/your-username/luxury-rp-loading-screen.git
   ```
2. Upload the repository contents to your desired directory.
3. Update the **particles.json** file (if necessary) to customize the particle effects.

  ```
const songs = [
    {
        title: "Your Song Title",
        artist: "Your Song Artist",
        cover: "https://files.catbox.moe/your-song-cover.png",
        video: "https://files.catbox.moe/your-background.mp4"
    }
];
  ```

---

## 📁 Project Structure
```
luxury-rp-loading-screen/
├── assets/
│   ├── css/              # Stylesheets
│   │   └── style.css
│   │   └── fonts.css
│   ├── fonts/             
│   │   └── Poppins
│   │   └── Poppins-Medium
│   │   └── Poppins-Regular
│   │   └── Poppins-SemiBold
│   ├── media/            # Media assets (video, images, audio)
│   │   ├── icons/        # Social icons and cursor image
│   ├── scripts/          # JS files
│       ├── main.js       # Main functionality
│       └── config.js     # Config configuration
│       └── particles.json # Particles.js configuration
├── index.html            # Main HTML file
└── README.md             # Repository documentation
```
---

## 🛠️ Technologies Used
- HTML5: Markup language for structuring the loading screen.
- CSS3: Styling and animations.
- JavaScript: Functionality for the music player, custom cursor, and interactions.
- Particles.js: Animation for particle effects.
- jQuery: Simplified DOM manipulation.

---

## 🎶 Adding Songs
To add new songs:

1. Upload your music video to https://catbox.moe/.
2. Upload your song cover to https://catbox.moe/.
3. Update the **songs** array in **main.js**:
```
const songs = [
    {
        title: "Your Song Title",
        artist: "Your Song Artist",
        cover: "https://files.catbox.moe/your-song-cover.png",
        video: "https://files.catbox.moe/your-background.mp4"
    }
];
```

---

## 🌟 Customization

- **Logo**
  - Replace the **logo.png** with your own custom logo. 

- **Cursor**
  - Replace the **cursor.png** file in **assets/media/icons** with your custom cursor design.

- **Particles Effect**
  - Edit **particles.json** to modify the particle behavior, colors, and density. Use the Particles.js Documentation for guidance


---

## 📄 License

This project is licensed under the MIT License. Feel free to use and modify it for your FiveM server.

---

## ❤️ Contributions

Contributions are welcome! If you have ideas or enhancements, feel free to submit a pull request or open an issue.


