#!/usr/bin/env python3
"""Copy only the bundled synthetic static template into a new directory."""
import argparse
import shutil
from pathlib import Path


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--output', required=True, type=Path)
    args = parser.parse_args()
    source = Path(__file__).resolve().parents[1] / 'assets' / 'starter'
    target = args.output.expanduser().absolute()
    if target.exists() or target.is_symlink():
        parser.error('Output must not exist; existing files are never overwritten.')
    if not source.is_dir() or any(p.is_symlink() for p in source.rglob('*')):
        parser.error('Missing template or unsupported symbolic link.')
    shutil.copytree(source, target)
    print(f'Created static prototype: {target}')
    print('Synthetic sample only. No authentication, CRM or stored inquiries included.')
    print(f'Preview: python -m http.server 8000 --directory "{target}"')


if __name__ == '__main__':
    main()
