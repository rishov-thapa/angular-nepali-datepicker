# Changelog

## [2.1.0] - 2026-06-11

### Major Changes
- **Expanded Date Range Support**: Now fully supports **1900 to 2100 BS** (previously limited to ~2000-2100). 
  This provides much more accurate historical and future date coverage.
- **Zero Configuration Assets**: Major improvement in Developer Experience!  
  JS and CSS files are now **fully bundled** inside the library.  
  Consumers no longer need to manually add asset paths in `angular.json`.

### Improvements
- Implemented smart bundling system for better reliability and easier installation.
- Enhanced `postinstall` script with automatic cleanup.
- Improved min/max date clamping logic for better boundary control.
- Updated documentation and README for new setup process.

### Breaking Changes
- None

---

## [2.0.0] - 2025-07-29
- Initial release with Ivy and ViewEngine support.
- Non-typeable input with calendar icon and tooltip.
- Customizable date formats (e.g., DD/MM/YYYY).
- Unicode Nepali digit support.
- BS↔AD conversion via service.