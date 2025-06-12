import {
  Calendar,
  Monitor,
  Users,
} from "lucide-react";

export default function ReleaseInfo() {
  const releaseItems = [
    {
      icon: Calendar,
      color: "blue",
      title: "发布日期",
      desc: "2025年6月4日",
    },
    {
      icon: () => (
        <div className="text-green-600 font-bold text-lg">β</div>
      ),
      color: "green",
      title: "版本状态",
      desc: "Beta 测试版",
    },
    {
      icon: Monitor,
      color: "purple",
      title: "支持平台",
      desc: "Windows/macOS/Linux",
    },
    {
      icon: Users,
      color: "orange",
      title: "目标用户",
      desc: "语言学习者",
    },
  ];

  return (
    <section className="py-20 px-6 bg-white">
      <div className="container mx-auto max-w-4xl">
        <div className="grid md:grid-cols-4 gap-8 text-center">
          {releaseItems.map((item, index) => (
            <div
              key={index}
              className={`space-y-4 transition-all duration-500 delay-${index * 100} hover:scale-105 group`}
            >
              <div
                className={`w-12 h-12 bg-${item.color}-100 rounded-2xl flex items-center justify-center mx-auto transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                <item.icon className={`w-6 h-6 text-${item.color}-600`} />
              </div>
              <h3 className="font-semibold text-gray-900 transition-colors duration-300 group-hover:text-gray-700">
                {item.title}
              </h3>
              <p className="text-gray-600 transition-colors duration-300 group-hover:text-gray-800">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
