from django.http import JsonResponse


SITE_CONFIG = {
    "brand": {
        "name": "EchoSim",
        "tagline": "车辆仿真平台",
        "company": "吉林省睿语智软科技有限公司",
    },
    "navigation": [
        {"label": "首页", "href": "#top", "active": True},
        {"label": "EchoSim", "href": "#echosim", "showInFooter": True},
        {"label": "核心能力", "href": "#capabilities", "showInFooter": True},
        {"label": "应用场景", "href": "#applications", "showInFooter": True},
        {"label": "案例演示", "href": "#demo", "showInFooter": True},
        {"label": "技术支持", "href": "#technology"},
        {"label": "关于我们", "href": "#about"},
    ],
    "contact": {
        "phone": "15843080878",
        "email": "ruiyuzongheng@163.com",
    },
}


def health(request):
    return JsonResponse({"status": "ok"})


def site_config(request):
    return JsonResponse(SITE_CONFIG)

