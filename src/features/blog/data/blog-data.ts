export type BlogCategory = "Hướng dẫn kỹ thuật" | "Tin tức hãng" | "Bảo trì thiết bị";

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  date: string;
  category: BlogCategory;
};

/** Static seed data; it can be replaced by CMS or API results without changing the UI. */
export const blogPosts: ReadonlyArray<BlogPost> = [
  {
    id: "chon-bom-thuy-luc",
    slug: "cach-chon-bom-thuy-luc-cho-he-thong-cong-nghiep",
    title: "Cách chọn bơm thủy lực cho hệ thống công nghiệp: 5 thông số cần biết",
    excerpt: "Áp suất, lưu lượng, kiểu điều khiển và điều kiện vận hành là các yếu tố quyết định khi chọn bơm cho dây chuyền.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuClghwB2Q_xEC0_PIa413j6K_-sjQj9vCuaXcjGSEAN0B_1cnYeqLK6wJqzCE6WU8pdPGlc0LiJxjYo-n60SaWgKhI6eTfdUC4miceKK5O7z6d6pv87e8MKk3vcqvaqPJuX5yMKjsTonYkulnMLGAW4gBYnmq1yWkaZN5hnioFFjqZ86fy-OSO-ZgY0cuW7PKigbTnooJwFEEKbBQQOaHi5O0yuZK0hnbtNOst2Wy-kAHovDlN8o0R3",
    date: "18/09/2026",
    category: "Hướng dẫn kỹ thuật",
  },
  {
    id: "bao-duong-he-thong",
    slug: "quy-trinh-bao-duong-he-thong-thuy-luc-dinh-ky",
    title: "Quy trình bảo dưỡng hệ thống thủy lực định kỳ giúp giảm thời gian dừng máy",
    excerpt: "Danh sách kiểm tra dầu thủy lực, lọc dầu, nhiệt độ và rò rỉ để duy trì hiệu suất vận hành ổn định.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuAI50nmadjVJ5AKaqnrzprH9AMiX3je29mAkOh3F3OUDralWCNFWArVXFlCL8VUTv5zPQXIrY8aFnkcnHBCoIzt8c1E83pFav77_vmZmknsvmV1YJuXtOXAM7vrh46GzcGRyTxXw8FmFp7vlrclmKSNERS7ZXkzZKVOtyHJ4qJxTyePqHg9cjVYr6Yoaa_SftPIPFSh5eYmbhNbNNGx48BwSKJN5MhfPnlyJ8kNNX8dl-n_Zal1ebId",
    date: "12/09/2026",
    category: "Bảo trì thiết bị",
  },
  {
    id: "ma-tuong-duong",
    slug: "cach-tra-ma-tuong-duong-van-thuy-luc-rexroth-yuken",
    title: "Cách tra mã tương đương van thủy lực Rexroth và Yuken",
    excerpt: "Hiểu đúng ký hiệu, chuẩn lắp đặt và thông số cuộn coil để chọn mã thay thế tương thích cho hệ thống.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuASw7FzOLmvzLQuEG_WBOV6v4SECuB3XfD5tPMkhcemRZ4H0DpW3-_SxuLDTuuJ9Lf2OqhPbojNRquqXJiyrMbHTpC5Tpphn-VUca1uJzFimPRnAVP8AyJbabkR-7cfTSLdY9T-WIzJLG0B90EzG-muShHo867ZfP_sQ76daFs8zjemxImBEppzaCaIxR9B9rxJCDvD6GKLGOHZ_sEFkgGNdHy9n2zaMvh0SRB8JJX24diJovth_EcR",
    date: "05/09/2026",
    category: "Hướng dẫn kỹ thuật",
  },
  {
    id: "dau-hydraulic",
    slug: "khi-nao-can-thay-dau-thuy-luc-cho-may-cong-nghiep",
    title: "Khi nào cần thay dầu thủy lực cho máy công nghiệp?",
    excerpt: "Nhận biết dầu suy giảm chất lượng qua màu sắc, độ nhớt, nhiệt độ và kết quả phân tích mẫu dầu.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuC_GLFASNKQIIdKa-O18W8V0FOqj3yayvCC0QY_CGmOcHtmhzC4tIQ2AB8DC3dejv6DzUF-WhpRbnEb6hccz8ym1Pqu5wiojqTZbSQuF62jQiZxRN8A7cwVrMidMAn4TQ0hT8QqS2PfyYvdjQV63NxrwX0iAUSc1YCT6OMxigKgzLMyZ6_9FYtc27yK97Ni7wL27EWRMMMyFgFpb7iVV8LJoX89EnHVSGnAnahYdnN0yWXLRJajCshE",
    date: "28/08/2026",
    category: "Bảo trì thiết bị",
  },
  {
    id: "rexroth-4we6",
    slug: "huong-dan-doc-ma-van-dao-chieu-rexroth-4we6",
    title: "Hướng dẫn đọc mã van đảo chiều Rexroth 4WE6",
    excerpt: "Giải nghĩa các thành phần trong mã model để xác định đúng kiểu con trượt, điện áp và cấu hình kết nối.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBxsAHtwY_qsS3PiUP0FZjtlcsWbNp_ghQdQ6nWmJltjh0uSpdtvbzaHFKyyoc6UUNAp1YmEDNZFvLxEeARQtO0qpOYFSLWHJbqPPlx23t2Kopesm8EsC3ZN_6wVASzSQHey3_dI-vTVR0AuGJZfzWYkH5hkzWjiYMn4MOjYPgxXqMb74IthKH---NfMMjhYw1KA6HE5PP97McZvGHGS4eUwMI08245ojk97HgQMSidRjD2aaHE1XHp",
    date: "20/08/2026",
    category: "Tin tức hãng",
  },
  {
    id: "co-cq",
    slug: "co-cq-la-gi-khi-mua-thiet-bi-thuy-luc",
    title: "CO/CQ là gì khi mua thiết bị thủy lực cho doanh nghiệp?",
    excerpt: "Phân biệt chứng nhận xuất xứ và chất lượng, cùng các lưu ý khi yêu cầu hồ sơ hàng hóa cho dự án.",
    coverImage: "https://lh3.googleusercontent.com/aida-public/AB6AXuBbh9UnBUsTYesHBL569Kq21xyGJlCaF1VMSk-OwD1TW2hlV_-B3eoSqdDkExLWZJuBvm1rB9bcPeBU0hqCiFPa0eC47-BCli9Zc3O4Ss0qccKabTnVeil6CC1SW7OTcd2CiqrjHsEpcdFdHgsqVQoBWkHI1KQT2_SAszfm2NV7abjBiZbyJ7_e9X705vdHC49aVmXQ4SgZN9r-dyuoLKlo9dcIr-nUBsyaba9rAotODJtXDMeYjrfw",
    date: "14/08/2026",
    category: "Hướng dẫn kỹ thuật",
  },
];

export const blogCategories = ["Tất cả bài viết", "Hướng dẫn kỹ thuật", "Tin tức hãng", "Bảo trì thiết bị"] as const;
