#!/usr/bin/env python3
"""Install the bundled skill locally without network access or dependencies."""
import argparse
import os
import shutil
from pathlib import Path

NAME = 'personal-catalog-site-builder'


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--skills-dir', type=Path, help='Override the skills directory')
    parser.add_argument('--dry-run', action='store_true')
    args = parser.parse_args()
    source = Path(__file__).resolve().parent / 'skills' / NAME
    base = args.skills_dir or Path(os.environ.get('CODEX_HOME', str(Path.home() / '.codex'))) / 'skills'
    destination = base.expanduser().absolute() / NAME
    if not (source / 'SKILL.md').is_file():
        parser.error('Skill package is missing.')
    if destination.exists() or destination.is_symlink():
        parser.error('Skill already exists. Nothing was changed; select another directory or back it up first.')
    if any(p.is_symlink() for p in source.rglob('*')):
        parser.error('Symbolic links are not allowed in the package.')
    if args.dry_run:
        print(f'Would install {NAME} into {destination}')
        return
    destination.parent.mkdir(parents=True, exist_ok=True)
    shutil.copytree(source, destination)
    print(f'Installed: {destination}')
    print(f'Open a new conversation and invoke ${NAME}.')


if __name__ == '__main__':
    main()
