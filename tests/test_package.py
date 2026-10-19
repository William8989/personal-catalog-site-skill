import json
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
SKILL = ROOT / 'skills' / 'personal-catalog-site-builder'


class PackageTests(unittest.TestCase):
    def run_script(self, script, *args):
        return subprocess.run([sys.executable, str(script), *map(str, args)], capture_output=True, text=True)

    def test_scaffold_and_refuse_overwrite(self):
        with tempfile.TemporaryDirectory() as temp:
            target = Path(temp) / 'demo'
            script = SKILL / 'scripts' / 'scaffold_site.py'
            first = self.run_script(script, '--output', target)
            self.assertEqual(first.returncode, 0, first.stderr)
            self.assertTrue((target / 'index.html').is_file())
            self.assertEqual(set(p.name for p in target.iterdir()), {'index.html', 'app.js', 'styles.css', 'site-data.json', 'product.svg'})
            marker = target / 'keep.txt'
            marker.write_text('keep', encoding='utf-8')
            self.assertNotEqual(self.run_script(script, '--output', target).returncode, 0)
            self.assertEqual(marker.read_text(), 'keep')

    def test_installer_and_refuse_overwrite(self):
        with tempfile.TemporaryDirectory() as temp:
            target = Path(temp) / 'skills'
            preview = self.run_script(ROOT / 'install.py', '--skills-dir', target, '--dry-run')
            self.assertEqual(preview.returncode, 0)
            self.assertFalse(target.exists())
            first = self.run_script(ROOT / 'install.py', '--skills-dir', target)
            self.assertEqual(first.returncode, 0, first.stderr)
            self.assertEqual((target / SKILL.name / 'SKILL.md').read_bytes(), (SKILL / 'SKILL.md').read_bytes())
            self.assertNotEqual(self.run_script(ROOT / 'install.py', '--skills-dir', target).returncode, 0)

    def test_synthetic_public_data(self):
        data = json.loads((SKILL / 'assets' / 'starter' / 'site-data.json').read_text(encoding='utf-8'))
        ids = [p['id'] for p in data['products']]
        self.assertEqual(len(set(ids)), len(ids))
        for p in data['products']:
            self.assertEqual(set(p), {'id', 'name', 'image', 'models'})
            for m in p['models']:
                self.assertEqual(set(m), {'size', 'code', 'index'})
        self.assertTrue(any(not p['models'] for p in data['products']))

    def test_no_sensitive_file_types(self):
        for p in ROOT.rglob('*'):
            if any(part in {'.git', '__pycache__', 'node_modules'} for part in p.relative_to(ROOT).parts):
                continue
            self.assertFalse(p.is_symlink(), str(p))
            if p.is_file():
                self.assertNotIn(p.suffix.lower(), {'.db', '.sqlite', '.xlsx', '.csv', '.pem', '.key', '.jpg', '.mp4', '.zip'})
                self.assertFalse(p.name.startswith('.env'))


if __name__ == '__main__':
    unittest.main()
