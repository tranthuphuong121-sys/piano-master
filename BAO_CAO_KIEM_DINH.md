# PIANO MASTER v7.1 — BIÊN BẢN KIỂM ĐỊNH
Ngày: 09/10/2026
## A. Kiểm thử mô phỏng
Đã chạy 6 tình huống trên Node.js, tách logic chấm điểm từ chính index.html. Kết quả:
all correct: PASS
late 300ms: PASS
early release: PASS
missing note: PASS
extra note: PASS
no note off: PASS

Giới hạn: chưa chạy giao diện trên mọi trình duyệt, chưa xác nhận MIDI thực, không đo âm thanh hay độ trễ.
## B. Kiểm thử đàn thật / micro / độ trễ — CHƯA THỰC HIỆN
Yêu cầu: đàn điện có USB MIDI, máy tính Chrome/Edge hỗ trợ Web MIDI, cáp dữ liệu, micro được cấp quyền, tai nghe/loa.
Quy trình kiểm tra:
1. Kiểm tra kết nối MIDI, nhận 20 lần C4 và 20 lần E4; đối chiếu note on/off và mất sự kiện.
2. Chơi 10 cặp hai tay đồng thời, 10 hợp âm ba nốt; đối chiếu log và phát hiện nốt thừa/thiếu.
3. Chơi bài 2 ô nhịp ở 40/60/80 BPM, ít nhất 3 lần mỗi tốc độ, so sánh kết quả với bản ghi MIDI tham chiếu.
4. Kiểm tra giữ nốt, nhả nốt, nhấn lặp, pedal và chuyển thiết bị giữa bài.
5. Kiểm tra micro trong phòng yên tĩnh và có tiếng ồn, các quãng âm khác nhau. Chỉ xác nhận nốt đơn; hợp âm micro chưa đủ tin cậy.
6. Độ trễ: đối chiếu timestamp MIDI với nhịp tham chiếu qua bản ghi sự kiện; đo ít nhất 30 lần, tính median, độ phân tán và tỷ lệ lệch. Không tự suy ra độ trễ từ kết quả chơi người thật.
7. Thử trên điện thoại: xác minh trình duyệt có Web MIDI hay không; không mặc định Android/iOS đều hỗ trợ.
Điều kiện nghiệm thu đề xuất: không mất Note On/Off trong 100 lượt thử, phát hiện nốt thừa/thiếu theo log, không treo khi ngắt kết nối. Ngưỡng sai số thời gian cần xác lập sau khi có thiết bị.
## C. Thẩm định bàn tay và giáo trình — CHƯA ĐƯỢC CHUYÊN GIA XÁC NHẬN
Checklist:
- Bàn tay có 5 ngón, ngón cái nằm đúng phía trong mỗi tay, tay trái ở âm vực thấp hơn tay phải khi bài yêu cầu.
- Đầu ngón tiếp xúc phím đúng cao độ, không xuyên phím, không dùng hình minh họa như dữ liệu đo tư thế.
- Quy ước ngón cái=1, trỏ=2, giữa=3, áp út=4, út=5 cho cả hai tay.
- Mỗi nốt trong từng bài có ngón đề xuất phù hợp với câu nhạc; kiểm tra đổi ngón, luồn ngón, vượt ngón và chuyển vị trí.
- Kiểm tra khóa Sol/Fa, cao độ trên dòng/khe, dấu hóa, dấu lặng, ô nhịp đủ phách, trường độ, liên kết nốt và dấu nối.
- Giáo trình phải tăng dần độ khó, có mục tiêu, nhịp, tốc độ và tiêu chí đạt, tránh khẳng định mọi ngón tay đều có duy nhất một cách đặt đúng.
Cần giáo viên piano hoặc chuyên gia khắc nhạc duyệt từng bài trước khi công bố là tài liệu chuẩn.
## Kết luận
ĐÃ XONG: sửa bài kiểm thử mô phỏng, thực thi kiểm thử tự động, tạo quy trình nghiệm thu và checklist chuyên môn.
CHƯA XONG: kiểm thử trên đàn/micro thực tế, xác nhận độ trễ phần cứng, thẩm định bởi giáo viên piano.
