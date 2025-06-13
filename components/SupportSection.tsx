import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Github, MessageSquare, Mail, ArrowRight } from "lucide-react";

export default function SupportSection() {
  const supportOptions = [
    {
      icon: Github,
      title: "GitHub Issues",
      desc: "提交 Bug 报告和功能建议",
      color: "gray",
      buttonText: "前往 GitHub",
    },
    {
      icon: MessageSquare,
      title: "社区讨论",
      desc: "加入用户交流和讨论",
      color: "blue",
      buttonText: "参与讨论",
    },
    {
      icon: Mail,
      title: "邮件联系",
      desc: "直接联系开发者",
      color: "green",
      buttonText: "发送邮件",
    },
  ];

  return (
    <section id="support" className="py-20 px-6 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white transition-all duration-500 hover:scale-105">
            反馈与支持
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            我们非常重视您的使用体验和反馈
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {supportOptions.map((support, index) => (
            <Card
              key={index}
              className={`text-center border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 transition-all duration-500 delay-${index * 100} hover:shadow-lg hover:scale-105 hover:-translate-y-2 group`}
            >
              <CardHeader className="pb-6">
                <div
                  className={`w-16 h-16 bg-${support.color === "gray" ? "gray" : support.color}-100 dark:bg-${support.color === "gray" ? "gray" : support.color}-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
                >
                  <support.icon
                    className={`w-8 h-8 text-${support.color === "gray" ? "gray-700 dark:text-gray-300" : support.color + "-600 dark:text-" + support.color + "-400"} transition-transform duration-300 group-hover:scale-110`}
                  />
                </div>
                <CardTitle className="text-xl text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-gray-700 dark:group-hover:text-gray-300">
                  {support.title}
                </CardTitle>
                <CardDescription className="text-gray-600 dark:text-gray-400 transition-colors duration-300 group-hover:text-gray-600 dark:group-hover:text-gray-300">
                  {support.desc}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="w-full rounded-xl border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-all duration-300 hover:scale-105 hover:shadow-lg hover:border-gray-400 dark:hover:border-gray-500 hover:bg-gray-50 dark:hover:bg-gray-700 group/btn"
                >
                  {support.buttonText}
                  <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
