// syntropy-lint-disable (check-rtl test fixture; violations are deliberate)
// Test fixture for check-rtl.mjs: an RTL-safe widget. Expected result: no errors.
import 'package:flutter/material.dart';

class CleanRow extends StatelessWidget {
  const CleanRow({super.key});

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsetsDirectional.only(start: 16, end: 8),
      alignment: AlignmentDirectional.centerStart,
      decoration: const BoxDecoration(
        borderRadius: BorderRadiusDirectional.only(topStart: Radius.circular(12)),
      ),
      child: const Text('نسبة العائد المتوقع 8.5%', textAlign: TextAlign.start),
    );
  }
}
