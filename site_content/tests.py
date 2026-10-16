from django.test import SimpleTestCase


class SiteConfigApiTests(SimpleTestCase):
    def test_site_config_contains_required_sections(self):
        response = self.client.get("/api/site-config/")

        self.assertEqual(response.status_code, 200)
        payload = response.json()
        self.assertIn("brand", payload)
        self.assertIn("navigation", payload)
        self.assertIn("contact", payload)

    def test_expected_navigation_items_are_shown_in_footer(self):
        response = self.client.get("/api/site-config/")
        navigation = response.json()["navigation"]
        footer_labels = [
            item["label"] for item in navigation if item.get("showInFooter") is True
        ]

        self.assertEqual(
            footer_labels,
            ["EchoSim", "核心能力", "应用场景", "案例演示"],
        )
