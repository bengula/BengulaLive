"""Bengula Inc branded PDF generation toolkit.

Modules:
    brand       — color, type, and layout tokens (single source of truth)
    sources     — citation registry keyed from content files
    components  — reusable ReportLab flowables styled from brand tokens
    parser      — plain-text content format -> build spec
    builder     — build spec -> finished PDF in public/documents
"""

from .builder import build_doc
from .parser import parse_file

__all__ = ["build_doc", "parse_file"]
