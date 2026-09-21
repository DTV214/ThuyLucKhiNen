export type ProductDetail = {
  slug: string;
  sku: string;
  series: string;
  name: string;
  brand: string;
  shortDescription: string;
  rating: string;
  reviewCount: number;
  availability: string;
  images: ReadonlyArray<{ src: string; alt: string }>;
  quickSpecs: ReadonlyArray<{ label: string; value: string; note?: string }>;
  specifications: ReadonlyArray<{ label: string; value: string }>;
};

export const productDetail: ProductDetail = {
  slug: "a10vso-71",
  sku: "A10VSO-71DR/31R",
  series: "Series 31",
  name: "Bơm Piston Trục Hướng Biến Lượng Bosch Rexroth A10VSO",
  brand: "Bosch Rexroth",
  shortDescription: "Bơm piston hướng trục đĩa nghiêng dùng cho truyền động thủy lực mạch hở trong hệ thống công nghiệp nặng, máy ép thủy lực và thiết bị cơ giới. Sản phẩm đạt hiệu suất thể tích cao, vận hành ổn định và bền bỉ.",
  rating: "5.0",
  reviewCount: 18,
  availability: "Sẵn kho Hà Nội & TP.HCM",
  images: [
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuDadxrDVbHfqm89pIVdW5d5_TtW9jTgUCOyCQYgk9RlKkzTbNsTEZyrmHh_jFkYi_5tazxAkXnt4msdZN9iFf4TbcfDQ_6u8GoBD02TUq_0dXQ9TRst7YxqrWl20dAQ4OwswM7L7snOsqbiFaH9IEqBqY4neGmVYdW_HvhJ6XKjZ8ErgL94wod4MhjyICr1DXR8meRhN9dOvIhx73xgRDAdUsACaLAvy9LUJW6pH7xWyWlbuYRNZCjC", alt: "Bơm piston Bosch Rexroth A10VSO" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuC1wWay09OklvkZPoZ1hf7eUZBrcudOcjlYaJbQw4xNeV75jNhPgPZJvNHnk6uncY-elfpfYWPDtBll-3UVik42SiHvOKRtTz_JWPg_E8W6CWExNCA9qWDJ1YrJpbGRftLddsJZiUqbuPD0OVKso1qqN0_VmQ-2qlk3adrGxjNyBQlHv5hApb_Ws7HKYMI0j9KW6mosyVfDcNeRdMW9Q-cizmN6WOvoM2VWLtT9wKw9EQy3T8jSBeXO", alt: "Mặt bích và trục bơm A10VSO" },
    { src: "https://lh3.googleusercontent.com/aida-public/AB6AXuCEgZCJgwuETHMq5VzcmjxyUldfZ2gcGnUB0pDlck9XWJ_ADTscVBXrECsDUJYCZueYGg_MkwrZcfTG3Kk4wHDkjLoHi6ICX_ARHDcI_gI6ug7aNjTJqyN1BLg_zQSm4ecHviG1IOEQAtHI8BIPKVyK9lMUofqpzMvLiFdSa6czCH0M0XI4TZx6E6fVXqlGK_dAcg1jmUdV859P2FotYmvya43zRvvmq4ooQkzfuSvAWV6BEVHu3Mrh", alt: "Nhãn thông số kỹ thuật A10VSO" },
  ],
  quickSpecs: [
    { label: "Áp suất định mức", value: "280 bar", note: "Max 350 bar" },
    { label: "Lưu lượng tối đa", value: "140 L/phút" },
    { label: "Tốc độ quay", value: "3000 rpm" },
    { label: "Trọng lượng", value: "32 kg" },
  ],
  specifications: [
    { label: "Dòng sản phẩm (Series)", value: "A10VSO Series 31" },
    { label: "Kiểu điều khiển", value: "DR (điều khiển áp suất)" },
    { label: "Áp suất định mức", value: "280 bar" },
    { label: "Áp suất cực đại", value: "350 bar" },
    { label: "Lưu lượng tối đa", value: "140 L/phút (tại 1800 rpm)" },
    { label: "Tốc độ quay (Min / Max)", value: "500 rpm / 3000 rpm" },
    { label: "Trọng lượng khô", value: "32 kg" },
    { label: "Xuất xứ / Tiêu chuẩn", value: "Đức / ISO 9001:2015" },
  ],
};

export const relatedProducts = [
  { name: "Van điều áp thủy lực Rexroth DBDH", category: "Van thủy lực", description: "Van chỉnh áp trực tiếp, ren G3/4, áp suất tối đa 315 bar.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCw87UVILNLcn4FhEHlYbP2c7vadcxDxDUEPGVw4BQng_aG10hup_AiUR0mjFPeIwTDujH1HGHk6eKC4q2Dbg81w78MF-KLoUgTvxku5JvFCXJ8XDZk99K2e4QL6rDlDSU8aq3ETotmNCj4fUblo3eI-nBU6IHSktQuOQ_RL67pWkckwfL6wCEt1WUj7gTxp24uOvxRh5R0qSqqeBlA-cl2IPOvkAZuxBRwQYZMOniRNhSR7borCgUx" },
  { name: "Bộ lọc dầu thủy lực hồi dòng RF", category: "Lọc dầu", description: "Độ tinh lọc 10 micron, tích hợp đồng hồ báo nghẹt lọc.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBHbv_5ONY7R_HRcJpnDLsGh1daHV6_biajIaTuTR2bdcX2slX798npGq1rqrUV9yHg8FimWG6GgqHCIoZt_4ppY3b6T6yXEgLSFP95IIuXOcMnF1DjGbwq7sqciT0UGp1jK__KQWTNozoEW4P3nw1naUB6kVI9yP4WwevurOPXZ3lW0RYimE6H4nIoq1PMsHBho4iTmotlywBJptgN_Smz7nxYKQLLBI54aTiEJUn8l3pYi4KRItgr" },
  { name: "Khớp nối trục bơm & Motor mặt bích", category: "Khớp nối", description: "Khớp nối mềm giảm chấn, đảm bảo đồng tâm chính xác cao.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCaHYnj0HzG4pzd_Ur-EUlPh1vFK2dveMYXBilozvKVc5l1M5fcKL4gcRWoP-JyfJm8e_wTtKVuhiUQSTuI09Xn0sOsyw1G4MFkA2KbgBDrirqcKnV1Yu9ZZkvCrEGtKzdmISKNbWd-uVKI81WpH2IrSTbUmFOSWhdxDDqTIFYcxf5NvdHDGNjTFWFWohOAnSc-LjOEWnEnULIrWEYucnp-TVDEyIYdM3yKRFfZf7rVOFx4X7UUkge2" },
  { name: "Két làm mát dầu thủy lực quạt gió", category: "Làm mát", description: "Giải nhiệt dầu công nghiệp AH series cho nguồn 220V/380V.", image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDx-fLL0D5B9CIq938xLLMf-5ViiR23C1SOJUfrkj5PVnoNkPMEpxHqnJ4w_dOLFZPoGHwKOP2uTvV3E_cPdFR6OorIGLITrKvmgFaSl9Wxw3urS-YHz8EhIXt4DrH3D27L7_Re3hWHMtYbf-YCBm1jN48wXuRVkcwMcjul5_PH7FvcLQortO18lvwVyFnymrJkeQC2uDHmrMvUM0KZTXf37hPsHfzxByeLrjB2f9boQF_dMK1rp8eR" },
] as const;

export function getProductBySlug(slug: string) {
  return slug === productDetail.slug ? productDetail : undefined;
}
