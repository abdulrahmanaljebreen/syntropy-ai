// syntropy-lint-disable (check-rtl test fixture; violations are deliberate)
// Test fixture for check-rtl.mjs: a Flutter widget with deliberate RTL mistakes.
// Every marked line should be reported. Do not copy this code.
import 'package:flutter/material.dart';

class DealSummaryCard extends StatelessWidget {
  const DealSummaryCard({super.key, required this.iban});
  final String iban;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.only(left: 16, right: 8, top: 12), // physical padding
      margin: const EdgeInsets.fromLTRB(16, 0, 8, 0), // physical margin
      alignment: Alignment.centerLeft, // physical alignment
      decoration: const BoxDecoration(
        borderRadius: BorderRadius.only(topLeft: Radius.circular(12)), // physical corner
        border: Border(left: BorderSide(width: 2)), // physical side
      ),
      child: Stack(
        children: [
          Column(
            crossAxisAlignment: CrossAxisAlignment.start, // fine: logical
            children: [
              const Text('نسبة العائد المتوقع ٨٫٥٪', textAlign: TextAlign.left), // Eastern digits + left
              const Text('1,250.50 ر.س', textAlign: TextAlign.start), // fine
              const Text('8.5٪'), // Arabic percent sign after Western digits
              // An IBAN is an LTR value: hardcoding ltr here is intended.
              Text(iban, textDirection: TextDirection.ltr), // reported as info only
            ],
          ),
          const Positioned(right: 0, top: 0, child: Icon(Icons.more_horiz)), // physical position
          const Padding(padding: EdgeInsets.only(left: 4)), // check-rtl-ignore (deliberate, ignored)
        ],
      ),
    );
  }
}
