// ĐỔI TÊN, LỜI CHÚC VÀ NHẠC TẠI ĐÂY, sau đó lưu và tải lại trang.
window.BIRTHDAY = {
  name: 'Kim Loan',
  sender: 'Thanh Sang',
  subtitle: 'Hôm nay, cậu là nhân vật chính.',
  letter: [
    'Ê, sinh nhật vui vẻ nha! 🎉',
    'Thêm một tuổi mới, chúc cậu có thật nhiều sức khỏe, học hành và công việc đều thuận lợi, ví tiền bớt mỏng và những ngày vui thì nhiều hơn những ngày phải thở dài.',
    'Cảm ơn cậu vì đã là một người bạn thật đáng quý. Mong rằng tụi mình sẽ còn nhiều dịp đi chơi, ăn món ngon, chụp những tấm ảnh ngớ ngẩn và kể cho nhau nghe đủ thứ chuyện trên đời.',
    'Tuổi mới cứ tự tin làm điều cậu thích, đi đến nơi cậu muốn và trở thành phiên bản khiến chính cậu tự hào.',
    'Chúc mọi điều tốt đẹp sẽ tìm đến cậu. Và nhớ nha: hôm nay được quyền ước thật nhiều, ăn bánh thật ngon và cười thật tươi! 🎂'
  ],
  music: 'assets/happy-birthday.mp3', // Ví dụ: 'assets/nhac.mp3'. Chép bài hát của bạn vào assets.
  photos: Array.from({length:9}, (_,i)=>({src:`assets/photo-${i+1}.jpg`, caption:[
    'Một chiếc cười thật xinh', 'Ngày bình thường, cậu vẫn rực rỡ', 'Giữ lại một chút thanh xuân',
    'Đi đâu cũng có ảnh đẹp', 'Một ngày thật đáng nhớ', 'Nụ cười này xứng đáng 10 điểm',
    'Cứ vui theo cách của cậu', 'Bộ sưu tập những điều dễ thương', 'Thêm nhiều khoảnh khắc như thế nhé'
  ][i]}))
};
